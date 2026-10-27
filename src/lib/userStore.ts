import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  provider?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory and users.json exist with seed accounts
function initUserStore(): StoredUser[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(USERS_FILE)) {
    // Seed standard verified accounts
    const salt = bcrypt.genSaltSync(10);
    const seedUsers: StoredUser[] = [
      {
        id: 'usr_admin_1',
        name: 'Valkyrrie Meds Admin',
        email: 'valkyrriemeds@gmail.com',
        passwordHash: bcrypt.hashSync('Password@123', salt),
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_gopal_2',
        name: 'K Gopal',
        email: 'kgopal@gmail.com',
        passwordHash: bcrypt.hashSync('Password@123', salt),
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_linkedin_3',
        name: 'K Gopal (LinkedIn)',
        email: 'kgopal@linkedin.com',
        passwordHash: bcrypt.hashSync('LinkedInAuthSecretKey2026!', salt),
        createdAt: new Date().toISOString(),
        provider: 'LinkedIn',
      },
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(seedUsers, null, 2), 'utf-8');
    return seedUsers;
  }

  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const users = initUserStore();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export async function registerNewUser(params: { name: string; email: string; password: string }) {
  const { name, email, password } = params;
  const users = initUserStore();
  const normalized = email.trim().toLowerCase();

  const existing = users.find((u) => u.email.toLowerCase() === normalized);
  if (existing) {
    return {
      success: false,
      error: 'An account with this email already exists. Please log in instead.',
      alreadyExists: true,
    };
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser: StoredUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: normalized,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
}

export async function authenticateCredentials(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const user = await findUserByEmail(normalized);

  if (!user) {
    return {
      success: false,
      error: 'You are not registered with this email address.',
      notRegistered: true,
    };
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    return {
      success: false,
      error: 'Incorrect password. Please verify your credentials or reset your password.',
      wrongPassword: true,
    };
  }

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

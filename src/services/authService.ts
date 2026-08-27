import { UserAccount, RegisterFormData, ExporterProfile } from '../types';

const STORAGE_USERS_KEY = 'dnk_registered_users_v3';
const STORAGE_CURRENT_USER_KEY = 'dnk_current_auth_user_v3';

// Pre-seeded authentic Indian Exporter for demo login (1 official demo account)
export const DEMO_EXPORTERS: (UserAccount & { password: string })[] = [
  {
    id: 'usr-varanasi-01',
    email: 'exports@varanasihandicrafts.org',
    password: 'password123',
    contactPerson: 'Devendra Sharma',
    businessName: 'Varanasi Silk & Handicrafts Guild',
    phone: '+91 98390 12845',
    businessCategory: 'Handicrafts & Artifacts',
    hasIEC: true,
    iecCode: '0518029481',
    hasGST: true,
    gstin: '09AAAFV1284M1ZV',
    hasLUT: true,
    lutNumber: 'AD0903250084712',
    preferredDGNK: 'Varanasi Cantt HPO DGNK (221002)',
    address: 'Plot 42, Chowk Silk Enclave, Godowlia',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221002',
    walletBalance: 18450,
    role: 'exporter',
    createdAt: '2025-11-15T10:30:00.000Z',
    lastLoginAt: new Date().toISOString()
  }
];

// Initialize local storage database
export function initializeUserDatabase(): void {
  try {
    const existing = localStorage.getItem(STORAGE_USERS_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEMO_EXPORTERS));
    }
  } catch (err) {
    console.error('Error accessing localStorage:', err);
  }
}

export function getAllUsers(): (UserAccount & { password?: string })[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEMO_EXPORTERS));
      return DEMO_EXPORTERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEMO_EXPORTERS;
  }
}

export function getStoredCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: UserAccount | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
      // Update in user list as well
      const all = getAllUsers();
      const idx = all.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
      if (idx >= 0) {
        all[idx] = { ...all[idx], ...user, lastLoginAt: new Date().toISOString() };
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(all));
      }
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    }
  } catch (err) {
    console.error('Error saving current user:', err);
  }
}

export async function loginUser(email: string, password: string): Promise<UserAccount> {
  // Normalize
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Please provide both email and password.');
  }

  // Try server API first if available
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password: cleanPass })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        saveCurrentUser(data.user);
        return data.user;
      }
    }
  } catch {
    // Fallback to local store
  }

  // Local lookup
  const all = getAllUsers();
  const found = all.find(u => u.email.toLowerCase() === cleanEmail);

  if (!found) {
    throw new Error(`No account found with email "${cleanEmail}". Please register as a new exporter.`);
  }

  if (found.password && found.password !== cleanPass) {
    throw new Error('Incorrect password. Please verify your credentials or click "Forgot Password".');
  }

  const { password: _, ...userSafe } = found;
  const loggedInUser: UserAccount = {
    ...userSafe,
    lastLoginAt: new Date().toISOString()
  };

  saveCurrentUser(loggedInUser);
  return loggedInUser;
}

export async function registerUser(formData: RegisterFormData): Promise<UserAccount> {
  const cleanEmail = (formData.email || '').trim().toLowerCase();
  const cleanPass = (formData.password || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Email and password are required.');
  }

  if (cleanPass.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (!formData.businessName || !formData.contactPerson) {
    throw new Error('Business name and contact person full name are required.');
  }

  // Check if exists
  const all = getAllUsers();
  const existing = all.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error(`An exporter account with email "${cleanEmail}" is already registered. Please log in.`);
  }

  const newId = `usr-dnk-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`;

  const newUserWithPass: UserAccount & { password: string } = {
    id: newId,
    email: cleanEmail,
    password: cleanPass,
    contactPerson: formData.contactPerson.trim(),
    businessName: formData.businessName.trim(),
    phone: formData.phone?.trim() || '+91 98765 43210',
    businessCategory: formData.businessCategory || 'Handicrafts & Artifacts',
    hasIEC: !!formData.hasIEC,
    iecCode: formData.hasIEC ? (formData.iecCode?.trim().toUpperCase() || '05' + Math.floor(10000000 + Math.random() * 90000000)) : '',
    hasGST: !!formData.hasGST,
    gstin: formData.hasGST ? (formData.gstin?.trim().toUpperCase() || '09AAAFV' + Math.floor(1000 + Math.random() * 9000) + 'M1ZV') : '',
    hasLUT: !!formData.hasLUT,
    lutNumber: formData.lutNumber || '',
    preferredDGNK: formData.preferredDGNK || 'New Delhi GPO DGNK (110001)',
    address: formData.address || '',
    city: formData.city || 'New Delhi',
    state: formData.state || 'Delhi',
    pincode: formData.pincode || '110001',
    walletBalance: 5000, // Welcome ₹5,000 credit bonus
    role: 'exporter',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };

  // Try server sync
  try {
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserWithPass)
    });
  } catch {
    // Continue
  }

  all.push(newUserWithPass);
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Error updating localStorage:', err);
  }

  const { password: _, ...userSafe } = newUserWithPass;
  saveCurrentUser(userSafe);
  return userSafe;
}

export function convertUserToExporterProfile(user: UserAccount): ExporterProfile {
  return {
    businessName: user.businessName,
    contactPerson: user.contactPerson,
    exporterName: user.contactPerson,
    email: user.email,
    phone: user.phone,
    businessCategory: user.businessCategory,
    hasIEC: user.hasIEC,
    iecCode: user.iecCode || '',
    hasGST: user.hasGST,
    gstin: user.gstin || '',
    hasLUT: user.hasLUT,
    lutNumber: user.lutNumber || '',
    preferredDGNK: user.preferredDGNK,
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
    pincode: user.pincode || '',
    walletBalance: user.walletBalance
  };
}

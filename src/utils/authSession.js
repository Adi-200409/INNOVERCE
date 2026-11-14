const AUTH_SESSION_KEY = 'innoverce_auth_user';
const LOCAL_USERS_KEY = 'innoverce_local_users';
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export function readStoredAuthUser() {
  try {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeStoredAuthUser(user) {
  try {
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearStoredAuthUser() {
  try {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function readLocalUsers() {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function handleLocalAuth(mode, { name, email, password }) {
  const lowerEmail = email.toLowerCase();
  const users = readLocalUsers();

  if (mode === 'signup') {
    if (users.some((u) => u.email.toLowerCase() === lowerEmail)) {
      return { error: 'An account with this email already exists. Please log in.' };
    }
    const newUser = { name, email: lowerEmail, password };
    try {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify([...users, newUser]));
    } catch {
      // Proceed even if localStorage is blocked
    }
    return { user: { name, email: lowerEmail, guest: false } };
  }

  const found = users.find((u) => u.email.toLowerCase() === lowerEmail && u.password === password);
  if (!found) {
    return { error: 'Invalid email or password.' };
  }
  return { user: { name: found.name, email: found.email, guest: false } };
}

/**
 * Authenticates via Django backend when available, falling back cleanly to localStorage.
 */
export async function authenticateUser(mode, { name = '', email, password }) {
  const endpoint = mode === 'signup' ? '/api/auth/signup/' : '/api/auth/login/';
  const body = mode === 'signup' ? { name, email, password } : { email, password };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const payload = await response.json().catch(() => null);
    if (payload && typeof payload.success === 'boolean') {
      if (!response.ok || !payload.success || !payload.user) {
        return {
          error:
            payload.message ||
            (mode === 'signup' ? 'Unable to create account. Check your details.' : 'Invalid email or password.')
        };
      }
      return { user: { ...payload.user, guest: false } };
    }
  } catch {
    // Fall back to localStorage when Django backend is unreachable
  }

  return handleLocalAuth(mode, { name, email, password });
}


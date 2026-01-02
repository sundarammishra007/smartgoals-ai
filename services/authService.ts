import { User } from '../types';
import { MOCK_USERS } from '../constants';

const SESSION_KEY = 'smart_goals_session';

export const login = async (email: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const loadSession = (): User | null => {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

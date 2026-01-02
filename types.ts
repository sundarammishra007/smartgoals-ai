export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface SmartGoalBreakdown {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  originalInput: string;
  smartBreakdown: SmartGoalBreakdown;
  progress: number; // 0 to 100
  createdAt: number;
  category: string;
  status: 'active' | 'completed' | 'abandoned';
}

// For chart data
export interface ChartDataPoint {
  name: string;
  value: number;
}

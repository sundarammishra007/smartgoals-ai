import { UserRole } from './types';

// Mock users for demonstration
export const MOCK_USERS = [
  {
    id: 'admin-1',
    name: 'Sarah Connor',
    email: 'admin@smartgoals.ai',
    password: 'admin', // In a real app, never store plain text passwords
    role: UserRole.ADMIN,
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'user@smartgoals.ai',
    password: 'user',
    role: UserRole.USER,
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@smartgoals.ai',
    password: 'user',
    role: UserRole.USER,
  }
];

export const DEFAULT_GOAL_CATEGORIES = [
  'Competitive Exams',
  'Startup & Business',
  'Career & Professional',
  'Health & Fitness',
  'Finance',
  'Personal Development',
  'Education',
  'Relationships'
];

export const GOAL_TEMPLATES = [
  { label: '🎯 UPSC CSE', prompt: 'I want to clear the UPSC Civil Services Exam (CSE) to become an IAS officer.', category: 'Competitive Exams' },
  { label: '🏦 IBPS PO (Bank)', prompt: 'I want to clear the IBPS Probationary Officer bank exam.', category: 'Competitive Exams' },
  { label: '📊 SSC CGL', prompt: 'I want to crack the SSC CGL exam for a government post.', category: 'Competitive Exams' },
  { label: '🚀 Launch Startup', prompt: 'I want to launch a tech startup and get my first 100 paying customers.', category: 'Startup & Business' },
  { label: '💰 Raise Funding', prompt: 'I want to create a pitch deck and raise seed funding for my business.', category: 'Startup & Business' },
  { label: '👨‍💻 Senior Developer', prompt: 'I want to get promoted to Senior Software Engineer.', category: 'Career & Professional' },
  { label: '🗣️ Public Speaking', prompt: 'I want to overcome my fear of public speaking and give a presentation.', category: 'Personal Development' },
];

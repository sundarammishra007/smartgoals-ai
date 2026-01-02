import { Goal } from '../types';
import { DEFAULT_GOAL_CATEGORIES } from '../constants';

const GOALS_KEY = 'smart_goals_data';
const CATEGORIES_KEY = 'smart_goals_categories';

export const getGoals = (): Goal[] => {
  const stored = localStorage.getItem(GOALS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveGoal = (goal: Goal): void => {
  const goals = getGoals();
  goals.push(goal);
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};

export const updateGoal = (updatedGoal: Goal): void => {
  const goals = getGoals();
  const index = goals.findIndex(g => g.id === updatedGoal.id);
  if (index !== -1) {
    goals[index] = updatedGoal;
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  }
};

export const deleteGoal = (goalId: string): void => {
  const goals = getGoals();
  const filtered = goals.filter(g => g.id !== goalId);
  localStorage.setItem(GOALS_KEY, JSON.stringify(filtered));
};

// Category Management
export const getCategories = (): string[] => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (stored) return JSON.parse(stored);
  
  // Initialize if empty
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_GOAL_CATEGORIES));
  return DEFAULT_GOAL_CATEGORIES;
};

export const addCategory = (category: string): void => {
  const categories = getCategories();
  if (!categories.includes(category) && category.trim() !== "") {
    categories.push(category.trim());
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
};

export const updateCategory = (oldName: string, newName: string): void => {
  const categories = getCategories();
  const index = categories.indexOf(oldName);
  if (index !== -1 && newName.trim() !== "") {
    categories[index] = newName.trim();
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    
    // Update linked goals
    const goals = getGoals();
    let goalsChanged = false;
    const updatedGoals = goals.map(g => {
      if (g.category === oldName) {
        goalsChanged = true;
        return { ...g, category: newName.trim() };
      }
      return g;
    });
    
    if (goalsChanged) {
        localStorage.setItem(GOALS_KEY, JSON.stringify(updatedGoals));
    }
  }
};

export const deleteCategory = (category: string): void => {
  let categories = getCategories();
  categories = categories.filter(c => c !== category);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

// Admin helper to seed some data if empty
export const seedInitialData = () => {
  if (getGoals().length === 0) {
    const now = Date.now();
    const seeds: Goal[] = [
      {
        id: 'g1',
        userId: 'user-1',
        title: 'Run a Marathon',
        originalInput: 'I want to run a marathon',
        smartBreakdown: {
          specific: 'Complete the NY City Marathon',
          measurable: 'Run 42.195 kilometers',
          achievable: 'Follow a 16-week training plan starting from 5k base',
          relevant: 'Improve cardiovascular health and personal endurance',
          timeBound: 'By November 5th, 2024'
        },
        progress: 45,
        createdAt: now - 86400000 * 10,
        category: 'Health & Fitness',
        status: 'active'
      },
      {
        id: 'g2',
        userId: 'user-2',
        title: 'Learn Python',
        originalInput: 'Learn to code in python',
        smartBreakdown: {
          specific: 'Complete the "Automate the Boring Stuff" course',
          measurable: 'Finish all 15 chapters and 3 capstone projects',
          achievable: 'Study 1 hour every weekday evening',
          relevant: 'Automate data entry tasks at current job',
          timeBound: 'Within 3 months'
        },
        progress: 10,
        createdAt: now - 86400000 * 2,
        category: 'Career & Professional',
        status: 'active'
      }
    ];
    localStorage.setItem(GOALS_KEY, JSON.stringify(seeds));
  }
  
  // Ensure categories are initialized
  getCategories();
};

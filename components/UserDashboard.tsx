import React, { useEffect, useState } from 'react';
import { User, Goal } from '../types';
import { getGoals, saveGoal, seedInitialData } from '../services/storageService';
import GoalCard from './GoalCard';
import CreateGoalModal from './CreateGoalModal';
import CategoryManagerModal from './CategoryManagerModal';
import { PlusIcon, TagIcon } from '@heroicons/react/24/outline';
import { PlusIcon as PlusSolid } from '@heroicons/react/24/solid';

interface UserDashboardProps {
  currentUser: User;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ currentUser }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const refreshGoals = () => {
    const allGoals = getGoals();
    const myGoals = allGoals.filter(g => g.userId === currentUser.id);
    setGoals(myGoals);
  };

  useEffect(() => {
    seedInitialData(); // Ensure seeds exist if localStorage is empty
    refreshGoals();
  }, [currentUser.id]);

  const handleSaveGoal = (goal: Goal) => {
    saveGoal(goal);
    refreshGoals();
  };

  const filteredGoals = goals.filter(g => {
    if (filter === 'all') return true;
    return g.status === filter;
  });

  // Calculate quick stats
  const completed = goals.filter(g => g.status === 'completed').length;
  const inProgress = goals.length - completed;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello, {currentUser.name}</h1>
          <p className="mt-1 text-gray-500">You have <span className="font-semibold text-indigo-600">{inProgress} active goals</span> and <span className="font-semibold text-green-600">{completed} completed</span>.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <TagIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Manage Categories
          </button>
          <button
            onClick={() => setIsGoalModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <PlusSolid className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Goal
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`${
                filter === f
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors`}
            >
              {f} Goals
            </button>
          ))}
        </nav>
      </div>

      {/* Grid */}
      {filteredGoals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGoals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onUpdate={refreshGoals}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300">
           <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No goals found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new SMART goal.</p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsGoalModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusSolid className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Goal
              </button>
            </div>
        </div>
      )}

      {isGoalModalOpen && (
        <CreateGoalModal 
          userId={currentUser.id} 
          onClose={() => setIsGoalModalOpen(false)} 
          onSave={handleSaveGoal} 
        />
      )}

      {isCategoryModalOpen && (
        <CategoryManagerModal 
          onClose={() => setIsCategoryModalOpen(false)}
          onUpdate={refreshGoals}
        />
      )}
    </div>
  );
};

export default UserDashboard;
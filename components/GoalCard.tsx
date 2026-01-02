import React, { useState } from 'react';
import { Goal } from '../types';
import { updateGoal, deleteGoal } from '../services/storageService';
import { TrashIcon, CheckCircleIcon, PlayIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

interface GoalCardProps {
  goal: Goal;
  onUpdate: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [localProgress, setLocalProgress] = useState(goal.progress);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalProgress(Number(e.target.value));
  };

  const saveProgress = () => {
    const updated = { ...goal, progress: localProgress };
    if (localProgress === 100) updated.status = 'completed';
    else updated.status = 'active';
    
    updateGoal(updated);
    onUpdate();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goal.id);
      onUpdate();
    }
  };

  const isCompleted = goal.status === 'completed';

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:shadow-md'}`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
           <div>
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
               {goal.category}
             </span>
             <h3 className="mt-2 text-lg font-bold text-gray-900 leading-tight">
               {goal.title || "Untitled Goal"}
             </h3>
             <p className="mt-1 text-sm text-gray-500 italic">"{goal.originalInput}"</p>
           </div>
           <button 
             onClick={handleDelete}
             className="text-gray-400 hover:text-red-500 transition-colors p-1"
           >
             <TrashIcon className="h-5 w-5" />
           </button>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Progress</span>
            <span>{localProgress}%</span>
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-500 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-indigo-600'}`} 
              style={{ width: `${localProgress}%` }}
            ></div>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={localProgress} 
            onChange={handleProgressChange}
            onMouseUp={saveProgress}
            onTouchEnd={saveProgress}
            className="w-full mt-2 h-2 bg-transparent appearance-none cursor-pointer"
            style={{opacity: 0}} // Invisible range input overlay for interaction
          />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center"
          >
            {expanded ? 'Hide Details' : 'View SMART Plan'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="bg-gray-50 px-5 py-4 rounded-b-xl border-t border-gray-100 text-sm space-y-3">
          <div className="grid grid-cols-[24px_1fr] gap-2">
             <span className="font-bold text-indigo-700">S</span>
             <span className="text-gray-700"><span className="font-semibold">Specific:</span> {goal.smartBreakdown.specific}</span>
          </div>
          <div className="grid grid-cols-[24px_1fr] gap-2">
             <span className="font-bold text-indigo-700">M</span>
             <span className="text-gray-700"><span className="font-semibold">Measurable:</span> {goal.smartBreakdown.measurable}</span>
          </div>
          <div className="grid grid-cols-[24px_1fr] gap-2">
             <span className="font-bold text-indigo-700">A</span>
             <span className="text-gray-700"><span className="font-semibold">Achievable:</span> {goal.smartBreakdown.achievable}</span>
          </div>
          <div className="grid grid-cols-[24px_1fr] gap-2">
             <span className="font-bold text-indigo-700">R</span>
             <span className="text-gray-700"><span className="font-semibold">Relevant:</span> {goal.smartBreakdown.relevant}</span>
          </div>
          <div className="grid grid-cols-[24px_1fr] gap-2">
             <span className="font-bold text-indigo-700">T</span>
             <span className="text-gray-700"><span className="font-semibold">Time-bound:</span> {goal.smartBreakdown.timeBound}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
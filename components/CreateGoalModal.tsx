import React, { useState, useEffect } from 'react';
import { generateSmartGoal } from '../services/geminiService';
import { GOAL_TEMPLATES } from '../constants';
import { getCategories } from '../services/storageService';
import { SmartGoalBreakdown, Goal } from '../types';
import { SparklesIcon, XMarkIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface CreateGoalModalProps {
  userId: string;
  onClose: () => void;
  onSave: (goal: Goal) => void;
}

const CreateGoalModal: React.FC<CreateGoalModalProps> = ({ userId, onClose, onSave }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [input, setInput] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<SmartGoalBreakdown | null>(null);

  useEffect(() => {
    const cats = getCategories();
    setCategories(cats);
    if (cats.length > 0) {
      setCategory(cats[0]);
    }
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    const result = await generateSmartGoal(input);
    if (result) {
      setGeneratedData(result);
      setStep(2);
    }
    setIsGenerating(false);
  };

  const handleFinalSave = () => {
    if (!generatedData) return;
    
    // Infer a title from specific or user input
    const title = generatedData.specific.length > 50 
      ? generatedData.specific.substring(0, 47) + '...' 
      : generatedData.specific;

    const newGoal: Goal = {
      id: Date.now().toString(),
      userId,
      title: title,
      originalInput: input,
      category,
      smartBreakdown: generatedData,
      progress: 0,
      createdAt: Date.now(),
      status: 'active'
    };
    
    onSave(newGoal);
    onClose();
  };

  const applyTemplate = (template: typeof GOAL_TEMPLATES[0]) => {
    setInput(template.prompt);
    // Try to match template category, otherwise fallback or keep current if valid
    if (categories.includes(template.category)) {
      setCategory(template.category);
    } else {
        // If the template category was deleted by user, we can either add it back or just select the first available.
        // For now, let's just select the first available to avoid side effects.
        if (categories.length > 0) setCategory(categories[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${step === 1 ? 'bg-indigo-100' : 'bg-green-100'}`}>
              <SparklesIcon className={`h-6 w-6 ${step === 1 ? 'text-indigo-600' : 'text-green-600'}`} />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {step === 1 ? 'Create New Goal with AI' : 'Review & Save Goal'}
              </h3>
              
              {step === 1 ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">What do you want to achieve?</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="e.g., I want to lose weight before summer..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Template Section */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <LightBulbIcon className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Start Templates</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {GOAL_TEMPLATES.map((t, idx) => (
                        <button
                           key={idx}
                           type="button"
                           onClick={() => applyTemplate(t)}
                           className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-200 transition-colors"
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-sm text-gray-500 bg-gray-50 rounded-md p-4 space-y-3 max-h-96 overflow-y-auto">
                   <p><span className="font-bold text-gray-900">S:</span> {generatedData?.specific}</p>
                   <p><span className="font-bold text-gray-900">M:</span> {generatedData?.measurable}</p>
                   <p><span className="font-bold text-gray-900">A:</span> {generatedData?.achievable}</p>
                   <p><span className="font-bold text-gray-900">R:</span> {generatedData?.relevant}</p>
                   <p><span className="font-bold text-gray-900">T:</span> {generatedData?.timeBound}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            {step === 1 ? (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !input.trim()}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {isGenerating ? 'Analyzing...' : 'Generate SMART Goal'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSave}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Confirm & Save
              </button>
            )}
            <button
              type="button"
              onClick={step === 1 ? onClose : () => setStep(1)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGoalModal;
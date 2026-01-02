import React, { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../services/storageService';
import { XMarkIcon, PencilIcon, TrashIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline';

interface CategoryManagerModalProps {
  onClose: () => void;
  onUpdate: () => void;
}

const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({ onClose, onUpdate }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setCategories(getCategories());
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory);
      setNewCategory('');
      loadCategories();
      onUpdate();
    }
  };

  const handleStartEdit = (index: number, currentVal: string) => {
    setEditingIndex(index);
    setEditingValue(currentVal);
  };

  const handleSaveEdit = (oldVal: string) => {
    if (editingValue.trim() && editingValue !== oldVal) {
      updateCategory(oldVal, editingValue);
      loadCategories();
      onUpdate();
    }
    setEditingIndex(null);
  };

  const handleDelete = (category: string) => {
    if (window.confirm(`Delete category "${category}"? Goals in this category will keep their label but won't be selectable for new goals.`)) {
      deleteCategory(category);
      loadCategories();
      onUpdate();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Manage Categories</h3>
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleAdd} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name..."
              className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
            />
            <button
              type="submit"
              disabled={!newCategory.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </form>

          <div className="overflow-y-auto max-h-96 -mx-4 px-4">
            <ul className="divide-y divide-gray-200">
              {categories.map((cat, idx) => (
                <li key={idx} className="py-3 flex items-center justify-between group">
                  {editingIndex === idx ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border p-1"
                        autoFocus
                      />
                      <button 
                        onClick={() => handleSaveEdit(cat)} 
                        className="text-green-600 hover:text-green-800 p-1"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => setEditingIndex(null)} 
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-700 text-sm font-medium">{cat}</span>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleStartEdit(idx, cat)}
                          className="text-gray-400 hover:text-indigo-600 p-1"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
              {categories.length === 0 && (
                <li className="py-4 text-center text-gray-500 text-sm italic">
                  No categories found.
                </li>
              )}
            </ul>
          </div>
          
          <div className="mt-5 sm:flex sm:flex-row-reverse">
             <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagerModal;
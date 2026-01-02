import React, { useEffect, useState } from 'react';
import { User, Goal } from '../types';
import { getGoals, seedInitialData } from '../services/storageService';
import { MOCK_USERS } from '../constants';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { UserGroupIcon, ChartBarIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

interface AdminDashboardProps {
  currentUser: User;
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [users] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    seedInitialData(); // Ensure there is some data to show
    setGoals(getGoals());
  }, []);

  // Compute Stats
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.progress === 100).length;
  const avgProgress = totalGoals > 0 
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / totalGoals) 
    : 0;

  // Chart Data: Category Distribution
  const categoryData = goals.reduce((acc: any[], goal) => {
    const existing = acc.find(c => c.name === goal.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: goal.category, value: 1 });
    }
    return acc;
  }, []);

  // Chart Data: Goals by User
  const userGoalData = users.map(u => ({
    name: u.name,
    goals: goals.filter(g => g.userId === u.id).length
  })).filter(d => d.goals > 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
           <p className="mt-1 text-gray-500">Monitor system performance and user engagement.</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-indigo-500">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Goals Created</dt>
                  <dd className="text-3xl font-bold text-gray-900">{totalGoals}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
          <div className="px-4 py-5 sm:p-6">
             <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <UserGroupIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                  <dd className="text-3xl font-bold text-gray-900">{users.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-orange-500">
          <div className="px-4 py-5 sm:p-6">
             <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                <ChartBarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg. Completion</dt>
                  <dd className="text-3xl font-bold text-gray-900">{avgProgress}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Goal Categories</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Goals per User</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGoalData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="goals" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* User Table List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
           <h3 className="text-lg leading-6 font-medium text-gray-900">User Management</h3>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {user.name.charAt(0)}
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-medium text-indigo-600 truncate">{user.name}</p>
                     <p className="flex items-center text-sm text-gray-500">
                       {user.email}
                     </p>
                   </div>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
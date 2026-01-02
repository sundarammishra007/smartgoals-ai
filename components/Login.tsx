import React, { useState } from 'react';
import { User } from '../types';
import { login } from '../services/authService';
import { LockClosedIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('user@smartgoals.ai');
  const [password, setPassword] = useState('user');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const user = await login(email);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Try admin@smartgoals.ai or user@smartgoals.ai');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemo = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setEmail('admin@smartgoals.ai');
      setPassword('admin');
    } else {
      setEmail('user@smartgoals.ai');
      setPassword('user');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {/* Back Button */}
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-20 flex items-center text-gray-500 hover:text-indigo-600 transition-colors px-3 py-2 bg-white/80 rounded-full shadow-sm backdrop-blur-sm border border-gray-200"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>
      )}

      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white shadow-xl z-10 w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <div className="mx-auto lg:mx-0 h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
               <UserIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to SmartGoals
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Transform your dreams into achievable targets
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-100">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all duration-200"
              >
                 <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="flex justify-between items-center">
               <button type="button" onClick={() => fillDemo('user')} className="text-xs text-indigo-600 hover:text-indigo-800 underline">Use Demo User</button>
               <button type="button" onClick={() => fillDemo('admin')} className="text-xs text-purple-600 hover:text-purple-800 underline">Use Demo Admin</button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - SMART Info */}
      <div className="hidden lg:block relative w-0 flex-1 bg-indigo-900">
        <div className="absolute inset-0 h-full w-full object-cover bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center p-12 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white opacity-5"></div>

           <div className="text-white space-y-10 max-w-lg relative z-10">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">Turn Dreams into Reality</h1>
                <p className="mt-4 text-lg text-indigo-100">Use our AI-powered tool to transform vague ideas into concrete, actionable plans using the S.M.A.R.T. framework.</p>
              </div>
              
              <div className="space-y-6">
                  {/* S */}
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center text-xl font-bold border border-white/10">S</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Specific</h3>
                      <p className="text-indigo-200 text-sm mt-1">Clear definitions of what you want to achieve.</p>
                    </div>
                  </div>
                  {/* M */}
                   <div className="flex items-start group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center text-xl font-bold border border-white/10">M</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Measurable</h3>
                      <p className="text-indigo-200 text-sm mt-1">Metrics to track progress and success.</p>
                    </div>
                  </div>
                  {/* A */}
                   <div className="flex items-start group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center text-xl font-bold border border-white/10">A</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Achievable</h3>
                      <p className="text-indigo-200 text-sm mt-1">Realistic goals within your reach.</p>
                    </div>
                  </div>
                  {/* R */}
                   <div className="flex items-start group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center text-xl font-bold border border-white/10">R</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Relevant</h3>
                      <p className="text-indigo-200 text-sm mt-1">Goals that align with your values.</p>
                    </div>
                  </div>
                  {/* T */}
                   <div className="flex items-start group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center text-xl font-bold border border-white/10">T</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Time-bound</h3>
                      <p className="text-indigo-200 text-sm mt-1">A defined timeline to create focus.</p>
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
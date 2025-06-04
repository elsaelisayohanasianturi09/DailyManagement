
import React from 'react';
import Settings from './Settings';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pastel-lavender-light via-pastel-rose-pink to-pastel-cream shadow-lg border-b-2 border-purple-200/30">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pastel-purple-soft to-pastel-rose-pink rounded-2xl flex items-center justify-center shadow-md animate-float">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-800 font-cute">
                Elsa's Daily Life Manager
              </h1>
              <p className="text-purple-600 text-sm font-cozy">
                Your magical productivity companion ✨
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-purple-600 font-cozy">Today is magical!</span>
              <span className="text-2xl animate-bounce-gentle">🌟</span>
            </div>
            <Settings />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

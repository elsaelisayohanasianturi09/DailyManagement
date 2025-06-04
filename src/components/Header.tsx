
import React from 'react';
import { Star, Heart, Settings } from 'lucide-react';

const Header = () => {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  
  const getGreeting = () => {
    if (hour < 12) return { text: "Good Morning", emoji: "🌅" };
    if (hour < 17) return { text: "Good Afternoon", emoji: "☀️" };
    return { text: "Good Evening", emoji: "🌙" };
  };

  const greeting = getGreeting();

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-purple-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-float">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-800 font-cute">
                Elsa's Daily Life Manager
              </h1>
              <p className="text-purple-600 text-sm font-cozy">
                {greeting.emoji} {greeting.text}, beautiful! 💖
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
              <Heart className="w-5 h-5 text-purple-600 animate-pulse-soft" />
            </button>
            <button className="w-10 h-10 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
              <Settings className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

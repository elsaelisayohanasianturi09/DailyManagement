
import React, { useState, useEffect } from 'react';
import { Trophy, Target, Zap, Heart, Star, TrendingUp } from 'lucide-react';

interface InteractiveStatsProps {
  totalTasks: number;
  completedTasks: number;
  streak?: number;
}

const InteractiveStats: React.FC<InteractiveStatsProps> = ({ 
  totalTasks, 
  completedTasks, 
  streak = 3 
}) => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [celebrationMode, setCelebrationMode] = useState(false);

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const getMotivationalMessage = () => {
    if (completionPercentage === 100) return "Perfect! Kamu luar biasa! 🌟";
    if (completionPercentage >= 80) return "Hampir selesai! Keep it up! 💪";
    if (completionPercentage >= 50) return "Great progress, Elsa! 🌈";
    if (completionPercentage >= 25) return "Good start! Terus semangat! ✨";
    return "Mari mulai petualangan hari ini! 🚀";
  };

  const getLevelInfo = () => {
    if (completionPercentage === 100) return { level: "Superstar", emoji: "🌟", color: "from-yellow-400 to-orange-400" };
    if (completionPercentage >= 80) return { level: "Champion", emoji: "🏆", color: "from-purple-400 to-pink-400" };
    if (completionPercentage >= 60) return { level: "Achiever", emoji: "⭐", color: "from-blue-400 to-cyan-400" };
    if (completionPercentage >= 40) return { level: "Go-getter", emoji: "🚀", color: "from-green-400 to-emerald-400" };
    return { level: "Beginner", emoji: "🌱", color: "from-green-300 to-green-400" };
  };

  useEffect(() => {
    if (completionPercentage === 100 && totalTasks > 0) {
      setCelebrationMode(true);
      setTimeout(() => setCelebrationMode(false), 3000);
    }
  }, [completionPercentage, totalTasks]);

  const levelInfo = getLevelInfo();

  const stats = [
    {
      id: 'completion',
      icon: Target,
      label: 'Completion',
      value: `${completionPercentage}%`,
      detail: `${completedTasks}/${totalTasks} tasks`,
      color: 'from-emerald-400 to-teal-400',
      hoverMessage: 'Persentase task yang sudah diselesaikan hari ini!'
    },
    {
      id: 'streak',
      icon: Zap,
      label: 'Streak',
      value: `${streak} hari`,
      detail: 'Konsistensi luar biasa!',
      color: 'from-orange-400 to-red-400',
      hoverMessage: 'Berapa hari berturut-turut kamu menyelesaikan semua task!'
    },
    {
      id: 'level',
      icon: Trophy,
      label: 'Level',
      value: levelInfo.level,
      detail: `${levelInfo.emoji} Keep going!`,
      color: levelInfo.color,
      hoverMessage: 'Level berdasarkan performa hari ini!'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Motivational Header */}
      <div className={`text-center p-4 rounded-2xl transition-all duration-500 ${
        celebrationMode 
          ? 'bg-gradient-to-r from-yellow-200 to-pink-200 animate-pulse' 
          : 'bg-gradient-to-r from-purple-100 to-pink-100'
      }`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
          <h3 className="text-lg font-bold text-purple-800">{getMotivationalMessage()}</h3>
          <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
        </div>
        
        {celebrationMode && (
          <div className="text-4xl animate-bounce">🎉 🌟 🎊</div>
        )}
      </div>

      {/* Interactive Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          const isHovered = hoveredStat === stat.id;
          
          return (
            <div
              key={stat.id}
              className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer transform ${
                isHovered 
                  ? 'border-purple-300 scale-105 shadow-xl' 
                  : 'border-purple-200 hover:border-purple-300'
              }`}
              onMouseEnter={() => setHoveredStat(stat.id)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center transform transition-transform duration-200 ${
                  isHovered ? 'scale-110' : ''
                }`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {isHovered && (
                  <div className="animate-bounce">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-purple-600">{stat.label}</p>
                <p className="text-2xl font-bold text-purple-800">{stat.value}</p>
                <p className="text-sm text-purple-500">{stat.detail}</p>
              </div>
              
              {/* Hover Message */}
              {isHovered && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="bg-purple-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    {stat.hoverMessage}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                      <div className="border-4 border-transparent border-t-purple-800"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-purple-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progress Hari Ini
          </h4>
          <span className="text-sm font-medium text-purple-600">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-purple-100 rounded-full h-4 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${levelInfo.color} transition-all duration-1000 ease-out rounded-full relative`}
            style={{ width: `${completionPercentage}%` }}
          >
            {completionPercentage > 0 && (
              <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
            )}
          </div>
        </div>
        
        <div className="mt-2 text-center">
          <span className="text-sm text-purple-600">
            {completionPercentage === 100 ? '🎉 Semua task selesai! Amazing! 🎉' : 
             completionPercentage >= 50 ? '💪 Setengah jalan menuju kesuksesan!' :
             '🌱 Mari mulai petualangan produktif!'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStats;

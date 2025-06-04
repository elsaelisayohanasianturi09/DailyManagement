
import React from 'react';
import { Trophy, Target, Calendar, Star } from 'lucide-react';

interface ProgressStatsProps {
  totalTasks: number;
  completedTasks: number;
  todayTasks: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ totalTasks, completedTasks, todayTasks }) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const getBadge = () => {
    if (completionRate >= 100) return { emoji: '🏆', text: 'Task Master!', color: 'from-yellow-300 to-orange-300' };
    if (completionRate >= 80) return { emoji: '⭐', text: 'Star Performer!', color: 'from-purple-300 to-pink-300' };
    if (completionRate >= 60) return { emoji: '🌟', text: 'Great Progress!', color: 'from-blue-300 to-purple-300' };
    if (completionRate >= 40) return { emoji: '🌱', text: 'Growing Strong!', color: 'from-green-300 to-blue-300' };
    return { emoji: '💫', text: 'Getting Started!', color: 'from-pink-300 to-purple-300' };
  };

  const badge = getBadge();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Today's Progress */}
      <div className="bg-gradient-to-br from-pastel-lavender to-pastel-lavender-light rounded-2xl p-6 text-center shadow-md border border-purple-200 hover:shadow-lg transition-all duration-300">
        <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce-gentle">
          <Calendar className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-purple-800">{todayTasks}</h3>
        <p className="text-purple-600 text-sm font-medium">Today's Tasks</p>
      </div>

      {/* Completion Rate */}
      <div className="bg-gradient-to-br from-pastel-mint to-pastel-mint-light rounded-2xl p-6 text-center shadow-md border border-green-200 hover:shadow-lg transition-all duration-300">
        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
          <Target className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800">{completionRate}%</h3>
        <p className="text-green-600 text-sm font-medium">Completion Rate</p>
      </div>

      {/* Total Completed */}
      <div className="bg-gradient-to-br from-pastel-peach to-pastel-peach-light rounded-2xl p-6 text-center shadow-md border border-orange-200 hover:shadow-lg transition-all duration-300">
        <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>
          <Trophy className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold text-orange-800">{completedTasks}</h3>
        <p className="text-orange-600 text-sm font-medium">Completed Tasks</p>
      </div>

      {/* Badge */}
      <div className={`bg-gradient-to-br ${badge.color} rounded-2xl p-6 text-center shadow-md border border-pink-200 hover:shadow-lg transition-all duration-300`}>
        <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>
          <span className="text-2xl">{badge.emoji}</span>
        </div>
        <h3 className="text-lg font-bold text-white">{badge.text}</h3>
        <p className="text-white/80 text-sm font-medium">Achievement Level</p>
      </div>
    </div>
  );
};

export default ProgressStats;

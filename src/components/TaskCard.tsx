
import React, { useState } from 'react';
import { Check, Clock, Star } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  emoji: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  time?: string;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: 'from-pastel-mint to-pastel-mint-light',
    medium: 'from-orange-100 to-orange-200',
    high: 'from-pastel-rose-pink to-pastel-lavender-light'
  };

  const priorityBorders = {
    low: 'border-green-200',
    medium: 'border-orange-300',
    high: 'border-pink-200'
  };

  return (
    <div 
      className={`task-card bg-gradient-to-r ${priorityColors[task.priority]} ${priorityBorders[task.priority]} 
                  cursor-pointer transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onToggle(task.id)}
    >
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200
                        ${task.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-purple-300 hover:border-purple-500'
                        }`}>
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
              {task.emoji}
            </span>
            <h3 className={`font-semibold text-purple-800 ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h3>
          </div>
          
          {task.time && (
            <div className="flex items-center gap-1 mt-1 text-purple-600 text-sm">
              <Clock className="w-3 h-3" />
              <span>{task.time}</span>
            </div>
          )}
        </div>

        <div className={`transition-all duration-200 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <Star className={`w-5 h-5 ${task.priority === 'high' ? 'text-pink-500' : 'text-purple-400'}`} />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

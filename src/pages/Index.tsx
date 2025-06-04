
import React, { useState } from 'react';
import Header from '@/components/Header';
import MotivationalQuote from '@/components/MotivationalQuote';
import TaskCard from '@/components/TaskCard';
import AddTaskForm from '@/components/AddTaskForm';
import InteractiveStats from '@/components/InteractiveStats';
import ConfettiAnimation from '@/components/ConfettiAnimation';

interface Task {
  id: string;
  title: string;
  emoji: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  time?: string;
}

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Morning stretches and meditation',
    emoji: '🧘‍♀️',
    priority: 'high',
    completed: false,
    time: '07:00'
  },
  {
    id: '2',
    title: 'Plan delicious breakfast',
    emoji: '🥞',
    priority: 'medium',
    completed: true,
    time: '08:00'
  },
  {
    id: '3',
    title: 'Water the plants',
    emoji: '🌱',
    priority: 'low',
    completed: false,
    time: '09:30'
  },
  {
    id: '4',
    title: 'Call mom and catch up',
    emoji: '📞',
    priority: 'high',
    completed: false,
    time: '15:00'
  },
  {
    id: '5',
    title: 'Evening skincare routine',
    emoji: '✨',
    priority: 'medium',
    completed: false,
    time: '21:00'
  }
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleToggleTask = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      
      // Check if task was just completed
      const toggledTask = updatedTasks.find(task => task.id === id);
      if (toggledTask?.completed) {
        setShowConfetti(true);
      }
      
      return updatedTasks;
    });
  };

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false
    };
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const todayTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender-light via-pastel-cream to-pastel-mint-light relative">
      <Header />
      
      <ConfettiAnimation 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-purple-800 mb-2 font-cute">
            Welcome Back, Elsa! 🌸
          </h2>
          <p className="text-purple-600 text-lg font-cozy">
            Ready to make today absolutely wonderful? ✨
          </p>
        </div>

        {/* Motivational Quote */}
        <MotivationalQuote />

        {/* Interactive Statistics */}
        <InteractiveStats 
          totalTasks={todayTasks}
          completedTasks={completedTasks}
          streak={3}
        />

        {/* Tasks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl animate-bounce-gentle">📋</span>
              <h3 className="text-2xl font-bold text-purple-800 font-cute">Today's Adventures</h3>
            </div>
            
            <div className="space-y-4">
              {tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggleTask}
                />
              ))}
            </div>
            
            {tasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌈</div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  Belum ada task hari ini!
                </h3>
                <p className="text-purple-600">
                  Mulai tambahkan task untuk memulai petualangan produktif! ✨
                </p>
              </div>
            )}
          </div>

          {/* Add Task Form */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>➕</span>
              <h3 className="text-2xl font-bold text-purple-800 font-cute">Add Magic</h3>
            </div>
            
            <AddTaskForm onAddTask={handleAddTask} />

            {/* Cute Stats Card */}
            <div className="bg-gradient-to-br from-pastel-rose-pink to-pastel-purple-soft rounded-2xl p-6 shadow-md border border-pink-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                  <span className="text-3xl">🎀</span>
                </div>
                <h4 className="text-lg font-semibold text-purple-800 mb-2 font-cute">
                  You're Amazing! 
                </h4>
                <p className="text-purple-600 text-sm font-cozy">
                  Every task completed is a step towards your dreams! 💫
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center pt-8">
          <p className="text-purple-600 font-cozy">
            Made with 💖 for Elsa's daily happiness and success! 🌈✨
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;

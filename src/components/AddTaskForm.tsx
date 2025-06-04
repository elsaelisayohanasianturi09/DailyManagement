
import React, { useState } from 'react';
import { Plus, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Task {
  id: string;
  title: string;
  emoji: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  time?: string;
}

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const emojiOptions = [
  '📝', '💼', '🏃‍♀️', '📚', '🛒', '🍳', '🧹', '💻', '📞', '🎨',
  '🌱', '💡', '🎵', '📖', '✨', '🌸', '🦋', '🌈', '💖', '🎀'
];

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📝');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      emoji,
      priority,
      time: time || undefined
    });

    setTitle('');
    setEmoji('📝');
    setPriority('medium');
    setTime('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="cute-button w-full flex items-center gap-2 text-lg py-6"
      >
        <Plus className="w-5 h-5 animate-bounce-gentle" />
        Add New Task ✨
      </Button>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200 animate-scale-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📝</span>
          <h3 className="text-lg font-semibold text-purple-800 font-cute">Add a New Task</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Task Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to accomplish? 💫"
              className="border-purple-200 focus:border-purple-400 rounded-xl"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">Emoji</label>
              <Select value={emoji} onValueChange={setEmoji}>
                <SelectTrigger className="border-purple-200 focus:border-purple-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-purple-200 rounded-xl">
                  {emojiOptions.map((e) => (
                    <SelectItem key={e} value={e} className="text-lg">
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">Priority</label>
              <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                <SelectTrigger className="border-purple-200 focus:border-purple-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-purple-200 rounded-xl">
                  <SelectItem value="low">🌱 Low</SelectItem>
                  <SelectItem value="medium">⭐ Medium</SelectItem>
                  <SelectItem value="high">🔥 High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Time (Optional)</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border-purple-200 focus:border-purple-400 rounded-xl pl-10"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="cute-button flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Add Task 🎉
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="px-6 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;

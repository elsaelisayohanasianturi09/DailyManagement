
import React, { useState } from 'react';
import { Plus, Calendar, Clock, Sparkles, Heart, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  emoji: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  time?: string;
  date?: Date;
}

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const emojiOptions = ['📝', '💼', '🏃‍♀️', '📚', '🛒', '🍳', '🧹', '💻', '📞', '🎨', '🌱', '💡', '🎵', '📖', '✨', '🌸', '🦋', '🌈', '💖', '🎀'];
const motivationalMessages = ["Yay! Task baru ditambahkan! 🎉", "Kamu luar biasa, Elsa! ✨", "Satu langkah lagi menuju kesuksesan! 🌟", "Task berhasil ditambahkan dengan cinta! 💖"];

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📝');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [time, setTime] = useState('');
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 500));
    
    onAddTask({
      title: title.trim(),
      emoji,
      priority,
      time: time || undefined,
      date: date || undefined
    });

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setTitle('');
      setEmoji('📝');
      setPriority('medium');
      setTime('');
      setDate(undefined);
      setIsOpen(false);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleQuickAdd = (quickTask: {
    title: string;
    emoji: string;
    priority: 'low' | 'medium' | 'high';
  }) => {
    onAddTask({
      ...quickTask,
      time: undefined,
      date: undefined
    });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 1500);
  };

  if (showSuccessMessage) {
    return (
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 shadow-lg border-2 border-green-200 animate-scale-in">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce">🎉</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
          </h3>
          <div className="flex justify-center">
            <Sparkles className="w-6 h-6 text-green-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="space-y-4">
        <Button 
          onClick={() => setIsOpen(true)} 
          className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-lg py-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0"
        >
          <Plus className="w-6 h-6 mr-2 animate-bounce" />
          Tambah Task Baru ✨
        </Button>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-200 shadow-md">
          <h4 className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Quick Add Tasks
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => handleQuickAdd({title: 'Minum air putih', emoji: '💧', priority: 'low'})} 
              className="bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 p-3 rounded-xl text-sm font-medium text-blue-800 transition-all duration-200 hover:scale-105"
            >
              💧 Minum Air
            </button>
            <button 
              onClick={() => handleQuickAdd({title: 'Olahraga ringan', emoji: '🏃‍♀️', priority: 'medium'})} 
              className="bg-gradient-to-r from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 p-3 rounded-xl text-sm font-medium text-pink-800 transition-all duration-200 hover:scale-105"
            >
              🏃‍♀️ Olahraga
            </button>
            <button 
              onClick={() => handleQuickAdd({title: 'Baca buku', emoji: '📚', priority: 'low'})} 
              className="bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 p-3 rounded-xl text-sm font-medium text-purple-800 transition-all duration-200 hover:scale-105"
            >
              📚 Baca Buku
            </button>
            <button 
              onClick={() => handleQuickAdd({title: 'Meditasi', emoji: '🧘‍♀️', priority: 'medium'})} 
              className="bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 p-3 rounded-xl text-sm font-medium text-green-800 transition-all duration-200 hover:scale-105"
            >
              🧘‍♀️ Meditasi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-xl border-2 border-purple-200 animate-scale-in relative">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-purple-600 font-medium">Menambahkan task...</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl animate-bounce">📝</span>
          <h3 className="text-lg font-semibold text-purple-800 font-cute">Buat Task Baru</h3>
          <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Judul Task</label>
            <Input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Apa yang ingin kamu capai hari ini? 💫" 
              autoFocus 
              className="border-2 border-purple-200 focus:border-purple-400 rounded-xl bg-white/50" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">Emoji</label>
              <Select value={emoji} onValueChange={setEmoji}>
                <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 rounded-xl bg-white/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-purple-200 rounded-xl">
                  {emojiOptions.map(e => (
                    <SelectItem key={e} value={e} className="text-lg hover:bg-purple-50">
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">Prioritas</label>
              <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 rounded-xl bg-white/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-purple-200 rounded-xl">
                  <SelectItem value="low" className="hover:bg-green-50">🌱 Rendah</SelectItem>
                  <SelectItem value="medium" className="hover:bg-yellow-50">⭐ Sedang</SelectItem>
                  <SelectItem value="high" className="hover:bg-red-50">🔥 Tinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">Tanggal</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-2 border-purple-200 focus:border-purple-400 rounded-xl bg-white/50",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pilih tanggal 📅</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">Waktu (Opsional)</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                <Input 
                  type="time" 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  className="border-2 border-purple-200 focus:border-purple-400 rounded-xl pl-10 bg-white/50" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold flex-1 py-3 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Task 🎉
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)} 
            className="px-6 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl font-medium"
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;

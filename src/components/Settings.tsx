
import React, { useState } from 'react';
import { Settings as SettingsIcon, Palette, Volume2, VolumeX, User, Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Settings: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('pastel');
  const [userName, setUserName] = useState('Elsa');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50">
          <SettingsIcon className="h-4 w-4 text-purple-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            <span className="text-3xl">⚙️</span>
            Pengaturan Elsa
            <span className="text-3xl">✨</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Profile Settings */}
          <div className="bg-white/60 rounded-xl p-4 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">Nama</label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border-purple-200 focus:border-purple-400"
                  placeholder="Masukkan nama kamu 💖"
                />
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white/60 rounded-xl p-4 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Tema & Tampilan
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span className="text-sm font-medium">Mode Gelap</span>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-2">Tema Warna</label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="border-purple-200 focus:border-purple-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pastel">🌸 Pastel Dream</SelectItem>
                    <SelectItem value="rainbow">🌈 Rainbow Magic</SelectItem>
                    <SelectItem value="ocean">🌊 Ocean Breeze</SelectItem>
                    <SelectItem value="sunset">🌅 Sunset Glow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="bg-white/60 rounded-xl p-4 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              Audio
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Efek Suara</span>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Musik Latar</span>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white/60 rounded-xl p-4 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifikasi
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pengingat Task</span>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pesan Motivasi</span>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pencapaian Harian</span>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl">
              Simpan Pengaturan 💫
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;


import React, { useState, useEffect } from 'react';
import { Lightbulb, Heart, Star } from 'lucide-react';

const motivationalQuotes = [
  "You're doing amazing, Elsa! ✨ Every small step counts! 💖",
  "Today is full of possibilities! 🌈 You've got this! 💪",
  "Remember to be kind to yourself! 🌸 Progress over perfection! 🎀",
  "You're stronger than you think, Elsa! 🦋 Believe in yourself! ✨",
  "Take it one task at a time! 🌟 You're making great progress! 🎉",
  "Your future self will thank you for today's efforts! 💝 Keep going! 🌈",
  "You are capable of beautiful things! 🌺 Trust the process! ✨"
];

const QuoteIcon = ({ index }: { index: number }) => {
  const icons = [Lightbulb, Heart, Star];
  const IconComponent = icons[index % icons.length];
  const colors = ['text-yellow-500', 'text-pink-500', 'text-purple-500'];
  
  return <IconComponent className={`w-6 h-6 ${colors[index % colors.length]} animate-pulse-soft`} />;
};

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length);
        setIsVisible(true);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-pastel-lavender-light to-pastel-rose-pink rounded-2xl p-6 shadow-lg border border-purple-200">
      <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`}>
        <div className="flex items-start gap-3">
          <div className="animate-bounce-gentle">
            <QuoteIcon index={currentQuote} />
          </div>
          <div className="flex-1">
            <p className="text-purple-800 font-medium text-lg leading-relaxed font-cute">
              {motivationalQuotes[currentQuote]}
            </p>
            <div className="mt-3 flex justify-end">
              <span className="text-purple-600 text-sm font-cozy">💕 Just for you, Elsa!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuote;

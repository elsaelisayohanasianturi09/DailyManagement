
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
  color: string;
  emoji: string;
}

interface ConfettiAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ isActive, onComplete }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const pieces: ConfettiPiece[] = [];
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
      const emojis = ['🎉', '✨', '🌟', '💖', '🎊', '🦋', '🌸', '💫'];
      
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 3,
          animationDuration: 3 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          emoji: emojis[Math.floor(Math.random() * emojis.length)]
        });
      }
      
      setConfetti(pieces);
      
      setTimeout(() => {
        setConfetti([]);
        onComplete?.();
      }, 5000);
    }
  }, [isActive, onComplete]);

  if (!isActive || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-bounce"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: `${piece.animationDuration}s`,
            top: '-10px'
          }}
        >
          <div 
            className="text-2xl opacity-80"
            style={{
              animation: `fall ${piece.animationDuration}s linear infinite`,
              color: piece.color
            }}
          >
            {piece.emoji}
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ConfettiAnimation;

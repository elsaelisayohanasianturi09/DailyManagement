
import React, { useEffect, useState } from 'react';

interface ConfettiAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ isActive, onComplete }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    emoji: string;
  }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: ['#FFB6C1', '#FFE4E1', '#E6E6FA', '#F0E68C', '#98FB98'][Math.floor(Math.random() * 5)],
        emoji: ['🎉', '✨', '🌸', '💖', '🎀', '🌈'][Math.floor(Math.random() * 6)]
      }));
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl animate-bounce"
            style={{
              left: particle.x,
              top: particle.y,
              color: particle.color,
              animationDuration: '2s',
              animationDelay: `${Math.random() * 0.5}s`
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
      
      <style>
        {`
          @keyframes confetti-fall {
            to {
              transform: translateY(100vh) rotate(360deg);
            }
          }
          
          .confetti-particle {
            animation: confetti-fall 3s linear forwards;
          }
        `}
      </style>
    </>
  );
};

export default ConfettiAnimation;

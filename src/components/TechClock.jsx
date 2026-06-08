import React, { useState, useEffect } from 'react';
import { Coffee, TerminalSquare, Database, Atom, Server, FileCode2, Palette, Smartphone, ShieldAlert, Globe, Layout, Network } from 'lucide-react';
import './TechClock.css';

const TechClock = () => {
  const [activeTicks, setActiveTicks] = useState(0);

  // 12 icons to match the 12 positions on a clock
  const icons = [Coffee, TerminalSquare, Database, Atom, Server, FileCode2, Palette, Smartphone, ShieldAlert, Globe, Layout, Network];

  useEffect(() => {
    // 12 ticks over 2 seconds = 2000ms / 12 = ~166ms per tick
    const interval = setInterval(() => {
      setActiveTicks(prev => {
        if (prev >= 12) {
          clearInterval(interval);
          return 12;
        }
        return prev + 1;
      });
    }, 166);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tech-clock-container">
      <div className="tech-clock-face">
        {/* The rotating stick */}
        <div 
          className="clock-stick" 
          style={{ transform: `rotate(${activeTicks * 30}deg)` }}
        />
        
        {/* The 12 tech icons appearing on each tick */}
        {icons.map((Icon, i) => {
          // If the tick has passed this icon's position, make it visible
          const isActive = activeTicks > i;
          
          // Math to position icons in a circle
          // i=0 is 1 o'clock (30 deg), i=1 is 2 o'clock (60 deg)... i=11 is 12 o'clock (360 deg)
          const angle = ((i + 1) * 30 - 90) * (Math.PI / 180);
          const radius = 55; // Distance from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div 
              key={i} 
              className="clock-icon-wrapper" 
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
               <div className={`clock-icon ${isActive ? 'visible' : ''}`}>
                 <Icon size={18} strokeWidth={1.5} />
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechClock;

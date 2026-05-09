import React, { useState, useEffect } from 'react';
import { Search, MousePointer2 } from 'lucide-react';
import './SearchIntro.css';

const SearchIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('entering'); // entering, typing, cursor-moving, loading, exploding
  const [typedText, setTypedText] = useState('');
  const fullText = "Dhawanharan Mahalingam";

  useEffect(() => {
    // Phase 1: Search bar enters (CSS scaleInBounce).
    // Phase 2: Start typing after 1500ms
    const typingTimer = setTimeout(() => {
      setPhase('typing');
      let currentLength = 0;
      
      const typeInterval = setInterval(() => {
        currentLength++;
        setTypedText(fullText.substring(0, currentLength));
        
        if (currentLength === fullText.length) {
          clearInterval(typeInterval);
          
          // Phase 3: Pause then Cursor moves to search icon
          setTimeout(() => {
            setPhase('cursor-moving');
            
            // Phase 4: Wait for cursor move (1.2s) then Clicked! Switch to loading state
            setTimeout(() => {
              setPhase('loading');
              
              // Phase 5: Loading for a bit longer, then Explode
              setTimeout(() => {
                setPhase('exploding');
                
                // End intro completely
                setTimeout(() => {
                  onComplete();
                }, 1000); // Wait for explosion animation
                
              }, 2500); // Loading duration
              
            }, 1200); // Cursor move duration
            
          }, 1000); // Pause after typing completes
        }
      }, 100); // Slower typing speed
      
    }, 1500);

    return () => clearTimeout(typingTimer);
  }, [onComplete, fullText]);

  // Fake background code strings
  const codeLines = [
    "import React from 'react';",
    "const initializeSystem = async () => {",
    "  await db.connect(process.env.MONGO_URI);",
    "  const dev = new Developer('Dhawanharan');",
    "  dev.skills.load(['MERN', 'Java', 'React Native']);",
    "  dev.deploy(Portfolio);",
    "  return dev.ignite();",
    "}",
    "// System operational."
  ];

  return (
    <div className={`search-intro-container ${phase === 'exploding' ? 'explode-out' : ''}`}>
      {/* Code Background Overlay */}
      <div className="code-background">
        {codeLines.map((line, i) => (
          <div key={i} className="code-line" style={{ animationDelay: `${i * 0.15}s` }}>
            <span className="line-num">{i + 1}</span> {line}
          </div>
        ))}
      </div>

      <div className={`search-wrapper ${(phase === 'loading' || phase === 'exploding') ? 'morph-to-loader' : ''}`}>
        {(phase === 'entering' || phase === 'typing' || phase === 'cursor-moving') && (
          <div className="search-bar">
            <span className="search-text">
              {typedText.length === 0 ? <span className="placeholder">Search Portfolio...</span> : typedText}
              {phase === 'typing' && <span className="search-cursor">|</span>}
            </span>
            <div className={`search-btn ${phase === 'cursor-moving' ? 'btn-clicked' : ''}`}>
              <Search size={28} />
            </div>
          </div>
        )}
        
        {(phase === 'loading' || phase === 'exploding') && (
          <div className="loader-ring"></div>
        )}
        
        {/* Fake Cursor */}
        {(phase === 'cursor-moving' || phase === 'typing') && (
          <div className={`fake-cursor ${phase}`}>
            <MousePointer2 size={36} color="#000" fill="#fff" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchIntro;

import React, { useRef, useState, useCallback, useEffect } from 'react';

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  // Use requestAnimationFrame for smooth 60fps tracking
  const requestRef = useRef();

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    // Store mouse coordinates so requestAnimationFrame can use them
    const { clientX, clientY } = e;
    
    cancelAnimationFrame(requestRef.current);
    
    requestRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the card
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Rotate between -10 and 10 degrees based on mouse position
      // Inverse logic: if mouse is on left, tilt left side down (positive rotateY)
      const rotateX = ((y - centerY) / centerY) * -10; 
      const rotateY = ((x - centerX) / centerX) * 10;

      // Calculate glare position based on percentage
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'none', // Remove transition for 1:1 mouse tracking
        background: `
          radial-gradient(
            circle at ${glareX}% ${glareY}%, 
            rgba(255, 255, 255, 0.15) 0%, 
            transparent 60%
          ),
          var(--card-hover-bg)
        `
      });
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    cancelAnimationFrame(requestRef.current);
    
    // Snap back to normal with a smooth transition
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), background 0.5s ease',
      background: 'var(--card-bg)'
    });
  }, []);

  // Cleanup
  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`${className} ${isHovering ? 'is-tilting' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transformStyle: 'preserve-3d', // Enable 3D children 
        willChange: 'transform'
      }}
    >
      {/* We wrap children in a container that moves slightly Z-forward for a parallax effect */}
      <div style={{ transform: isHovering ? 'translateZ(30px)' : 'translateZ(0)', transition: 'transform 0.3s ease' }}>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;

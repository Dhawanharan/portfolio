import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    
    // Position variables
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Update mouse coordinates instantly
    const updatePosition = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update the solid dot immediately for zero latency
      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    // Smooth animation loop for the trailing outline
    const animateOutline = () => {
      // Ease factor (0.15 makes it smooth but responsive)
      const ease = 0.15;
      
      outlineX += (mouseX - outlineX) * ease;
      outlineY += (mouseY - outlineY) * ease;
      
      if (outline) {
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      }
      
      requestAnimationFrame(animateOutline);
    };

    // Expand cursor when hovering over interactive elements
    const handleMouseOver = (e) => {
      if (!dot || !outline) return;
      
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('wavy-skill-inner') ||
        e.target.closest('.project-card') ||
        e.target.classList.contains('social-icon')
      ) {
        dot.classList.add('hovering');
        outline.classList.add('hovering');
      } else {
        dot.classList.remove('hovering');
        outline.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Start animation loop
    const animationId = requestAnimationFrame(animateOutline);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
    </>
  );
};

export default CustomCursor;

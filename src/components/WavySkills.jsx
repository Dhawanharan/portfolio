import React, { useEffect, useRef } from 'react';

const WavySkills = ({ skills }) => {
  // Duplicate the array three times to create a seamless infinite scrolling loop
  const extendedSkills = [...skills, ...skills, ...skills];
  
  const containerRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    let animationFrameId;

    const checkCenter = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestNode = null;
      let minDistance = Infinity;

      nodesRef.current.forEach(node => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const nodeCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - nodeCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestNode = node;
        }
      });

      nodesRef.current.forEach(node => {
        if (!node) return;
        // Apply glow only to the single closest node, if it's reasonably near the center
        if (node === closestNode && minDistance < 200) { 
          node.classList.add('center-glow');
        } else {
          node.classList.remove('center-glow');
        }
      });

      animationFrameId = requestAnimationFrame(checkCenter);
    };

    checkCenter();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="wavy-skills-container" ref={containerRef}>
      <div className="wavy-skills-track">
        {extendedSkills.map((skill, index) => {
          const originalIndex = index % skills.length;
          // Calculate the static Y offset using a sine wave based on its position
          const progress = originalIndex / skills.length;
          const angle = progress * Math.PI * 2; // 1 full sine wave per skill set
          const y = Math.sin(angle) * 45; // 45px amplitude for a nice curve
          
          // Generate a pseudo-random bounce height (amplitude) between 10px and 40px
          const bobAmplitude = 10 + Math.abs(Math.sin(originalIndex * 7.13)) * 30;
          
          // Generate a pseudo-random bounce speed between 2s and 3.5s
          const bobDuration = 2 + Math.abs(Math.cos(originalIndex * 3.7)) * 1.5;

          return (
            <div 
              key={index} 
              className="wavy-skill-node"
              style={{
                transform: `translateY(${y}px)`
              }}
            >
              <div 
                className="wavy-skill-inner"
                ref={el => nodesRef.current[index] = el}
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animationDuration: `${bobDuration}s`,
                  '--bob-amp': `${bobAmplitude}px`
                }}
              >
                {skill}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WavySkills;

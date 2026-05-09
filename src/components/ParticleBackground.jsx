import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let bokehParticles = [];
    let signals = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // The glowing, connecting nodes
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // z-index simulates depth (0.2 far to 1.5 close)
        this.z = Math.random() * 1.3 + 0.2;
        
        // Base size scaled by depth
        this.baseSize = (Math.random() * 1.5 + 1) * this.z;
        
        // Speed scaled by depth (closer objects move faster for parallax)
        this.speedX = (Math.random() * 1 - 0.5) * this.z;
        this.speedY = (Math.random() * 1 - 0.5) * this.z;

        // Palette: Cyan, Violet, Pink to match the image reference
        const colors = ['14, 165, 233', '139, 92, 246', '232, 121, 249'];
        this.colorRGB = colors[Math.floor(Math.random() * colors.length)];
        
        this.pulse = 0; // Flash effect when receiving data
      }

      triggerPulse() {
        this.pulse = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges smoothly
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        if (this.pulse > 0) {
          this.pulse -= 0.05;
        }
      }

      draw() {
        const currentPulse = Math.max(0, this.pulse);
        const pulseSize = this.baseSize * 5 + (currentPulse * 10);
        const pulseOpacity = 0.15 + (currentPulse * 0.4);

        // Soft outer glow (Bloom effect)
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.colorRGB}, ${pulseOpacity})`;
        ctx.fill();

        // Bright white/cyan inner core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.baseSize + (currentPulse * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    }

    // Large, out-of-focus background orbs (Bokeh effect)
    class BokehParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 15; // Huge
        this.speedX = (Math.random() * 0.4 - 0.2);
        this.speedY = (Math.random() * 0.4 - 0.2);
        const colors = ['14, 165, 233', '139, 92, 246'];
        this.colorRGB = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 - 50 || this.x > canvas.width + 50) this.speedX *= -1;
        if (this.y < 0 - 50 || this.y > canvas.height + 50) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Very soft, low opacity, no inner core
        ctx.fillStyle = `rgba(${this.colorRGB}, 0.05)`;
        ctx.fill();
      }
    }

    // Data signals that travel between nodes
    class Signal {
      constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.progress = 0;
        this.speed = Math.random() * 0.015 + 0.01; // Travel speed
        this.colorRGB = p1.colorRGB; // Inherit color from origin node
      }
      update() {
        this.progress += this.speed;
        return this.progress >= 1;
      }
      draw() {
        const currentX = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
        const currentY = this.p1.y + (this.p2.y - this.p1.y) * this.progress;
        
        const tailLength = 0.2; // Tail length is 20% of the line
        const tailProgress = Math.max(0, this.progress - tailLength);
        const tailX = this.p1.x + (this.p2.x - this.p1.x) * tailProgress;
        const tailY = this.p1.y + (this.p2.y - this.p1.y) * tailProgress;

        // Draw laser tail
        const gradient = ctx.createLinearGradient(tailX, tailY, currentX, currentY);
        gradient.addColorStop(0, `rgba(${this.colorRGB}, 0)`);
        gradient.addColorStop(1, `rgba(${this.colorRGB}, 0.8)`);
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        // Draw bright laser head
        ctx.beginPath();
        ctx.arc(currentX, currentY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      bokehParticles = [];
      signals = [];
      
      // Node count scaled by screen size so it doesn't get too cluttered
      const numberOfParticles = Math.min(window.innerWidth / 15, 80); 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
      
      // Bokeh background count
      const numberOfBokeh = Math.min(window.innerWidth / 40, 30);
      for (let i = 0; i < numberOfBokeh; i++) {
        bokehParticles.push(new BokehParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Global composition for bright light blending
      ctx.globalCompositeOperation = 'screen';
      
      // Draw Bokeh first (background)
      for (let i = 0; i < bokehParticles.length; i++) {
        bokehParticles[i].update();
        bokehParticles[i].draw();
      }

      // Draw Nodes and lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Draw Neural Network laser connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const maxDistance = 180; // Distance to search for connections
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            
            ctx.beginPath();
            // Gradient lines could be expensive, so we use the color of particle[i]
            // We increase opacity slightly to make them look like glowing laser beams
            ctx.strokeStyle = `rgba(${particles[i].colorRGB}, ${opacity * 0.8})`;
            
            // Thickness is based on depth/proximity
            ctx.lineWidth = Math.max(0.5, (particles[i].z + particles[j].z) * 0.8);
            
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();

            // Randomly spawn travelling data signals along active connections
            if (Math.random() < 0.002) { 
              signals.push(new Signal(particles[i], particles[j]));
            }
            if (Math.random() < 0.002) { 
              signals.push(new Signal(particles[j], particles[i]));
            }
          }
        }
      }

      // Draw all traveling data signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const isDone = signals[i].update();
        if (isDone) {
          signals[i].p2.triggerPulse(); // Flash the target node when data arrives!
          signals.splice(i, 1);
        } else {
          signals[i].draw();
        }
      }
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="bg-canvas" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0, 
        pointerEvents: 'none',
        background: '#0b0f19',
        opacity: 0.3 // Dimmed so it doesn't overpower the foreground content
      }} 
    />
  );
};

export default ParticleBackground;

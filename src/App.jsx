import React, { useState, useEffect } from 'react';
import { Mail, ExternalLink, Trophy, Medal, Target, Award, Download, User, Video, Image as ImageIcon } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import WavySkills from './components/WavySkills';
import SearchIntro from './components/SearchIntro';
import profileImg from './assets/profile.png';
import introVideo from './assets/intro.mp4';
import bakerStreetVideo from './assets/221-B.mp4';
import cryptoVideo from './assets/crypto system.mp4';
import whiteboardVideo from './assets/whiteboard.mp4';

const Github = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Typewriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevText => prevText + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}<span className="cursor">|</span></span>;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [formStatus, setFormStatus] = useState(''); // '', 'loading', 'success', 'error'

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('loading');
    const formData = new FormData(event.target);

    // IMPORTANT: Replace this with your actual Web3Forms Access Key
    formData.append("access_key", "63451702-5a8e-4591-95e4-b06d909bf245");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        event.target.reset();
        setTimeout(() => setFormStatus(''), 5000); // Clear success message after 5 seconds
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  const skills = [
    "C++", "Java", "Python", "MongoDB", "Express.js", "React", "Node.js",
    "React Native", "TypeScript", "Flask", "Cisco Packet Tracer", "Figma",
    "Cryptography", "Git", "GitHub"
  ];

  const projects = [
    {
      title: "Smart Marine Safety System",
      description: "Engineered real-time tracking and weather intelligence system using WebSockets. Optimized MongoDB queries to ensure zero-delay alerts for fishermen.",
      tech: ["React Native", "React", "MongoDB", "Flask", "Java"],
      link: "#",
      github: "#"
    },
    {
      title: "221B Baker Street",
      description: "Built a comprehensive digital library web app serving as a searchable repository for all Sherlock Holmes stories, optimized for fast online reading.",
      tech: ["MongoDB", "Express.js", "React", "Node.js"],
      video: bakerStreetVideo,
      link: "#",
      github: "https://github.com/Dhawanharan/sherlock_holmes_website"
    },
    {
      title: "Laptop Recommendation System",
      description: "A CLI based laptop recommendation system made using GNU prolog.",
      tech: ["GNU Prolog", "CLI"],
      //video: whiteboardVideo,
      link: "#",
      github: "#"
    },
    {
      title: "LMS UI/UX Redesign",
      description: "Led the collaborative redesign of a Learning Management System, utilizing modern design principles to significantly improve user flow and accessibility.",
      tech: ["Figma", "UI/UX Design", "Prototyping"],
      link: "#",
      github: "#"
    },
    {
      title: "Chess Clock App",
      description: "A modern, touch-friendly chess clock application featuring dynamic time controls and a full-screen, highly responsive dual-timer interface for competitive players.",
      tech: ["React Native", "TypeScript", "Node.js"],
      link: "#",
      github: "https://github.com/Dhawanharan/chess-clock"
    },
    {
      title: "Cryptography Utility System",
      description: "Developed an advanced encryption tool implementing industry-standard algorithms. Designed a CLI interface for secure, efficient data encryption and decryption operations.",
      tech: ["Java", "Cryptography", "Security Algorithms"],
      video: cryptoVideo,
      link: "#",
      github: "https://github.com/Dhawanharan/Cryptography-Utility-System"
    },
    {
      title: "Whiteboard",
      description: "A simple, aesthetically pleasing whiteboard drawing application built with Python, Tkinter, and the modern styling library 'ttkbootstrap'.",
      tech: ["Python", "Tkinter"],
      video: whiteboardVideo,
      link: "#",
      github: "https://github.com/Dhawanharan/Whiteboard"
    }

  ];

  const achievements = [
    {
      icon: <Medal size={32} color="#cbd5e1" />,
      title: "Finalist - Yarl Geek Challenge 2025",
      org: "Organized by Yarl IT Hub"
    },
    {
      icon: <Medal size={32} color="#94a3b8" />,
      title: "Semi-Finalist - SLIot Challenge 2026",
      org: "Organized by University of Moratuwa & SLT Mobitel"
    },
    {
      icon: <Target size={32} color="#0ea5e9" />,
      title: "Participant - CRE8X Competition 2025",
      org: "Organized by KDU"
    }
  ];

  const certifications = [
    {
      title: "AI Fundamentals",
      org: "Cisco & IBM SkillBuild",
      link: "https://www.credly.com/badges/73790e2e-1bee-49ca-bea8-0018811ae2b5/public_url"
    },
    {
      title: "IT Essentials",
      org: "Cisco",
      link: "https://www.credly.com/badges/5d46fc43-aff6-49bc-8856-2b265338aeef/public_url"
    },
    {
      title: "Startup Essentials Program",
      org: "UKI",
      //link: "#"
    }
  ];

  if (showSplash) {
    return <SearchIntro onComplete={() => setShowSplash(false)} />;
  }

  return (
    <>
      <ParticleBackground />

      <main className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-split">
            <div className="hero-text-col">
              <h1 className="hero-title">
                <Typewriter text="Dhawanharan Mahalingam" delay={100} />
              </h1>
              <h2 className="hero-subtitle">BSc Computer Science Undergraduate</h2>
              <p className="hero-bio">
                Full-Stack Developer passionate about building robust, data-driven web applications and scalable backend systems. Solving real-world problems through clean code and modern architecture.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="#" target="_blank" rel="noreferrer" className="btn btn-primary">
                  <Download size={18} /> Download Resume
                </a>
                <a href="#contact" className="btn btn-outline">Contact Me</a>
              </div>

              <div className="social-links">
                <a href="https://github.com/Dhawanharan" target="_blank" rel="noreferrer" className="social-icon" title="GitHub"><Github size={24} /></a>
                <a href="https://lk.linkedin.com/in/dhawanharan" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn"><Linkedin size={24} /></a>
                <a href="mailto:dhawanmaha@gmail.com" target="_blank" rel="noreferrer" className="social-icon" title="Email"><Mail size={24} /></a>
              </div>
            </div>

            <div className="hero-image-col">
              <div className="hero-image-wrapper">
                {/* Dynamically imported profile picture */}
                <img src={profileImg} alt="Dhawanharan Mahalingam" />
              </div>
            </div>
          </div>
        </section>

        {/* Wavy Skills Section */}
        <section id="skills">
          <h2 className="section-title">Technical Skills</h2>
          <WavySkills skills={skills} />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="section-title">Featured Work</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                {/* Placeholder for future video/image preview */}
                <div className="project-preview">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="project-video-preview"
                    />
                  ) : (
                    <>
                      <ImageIcon size={32} opacity={0.5} />
                      <span style={{ marginLeft: '10px', opacity: 0.5 }}>Screenshot / Video Preview</span>
                    </>
                  )}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noreferrer" title="GitHub">
                      <Github size={22} />
                    </a>
                  )}
                  {project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noreferrer" title="Live Demo">
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements & Certifications Section */}
        <section id="achievements">
          <div className="two-col-layout">
            <div className="column">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Achievements</h2>
              <div className="list-container">
                {achievements.map((item, index) => (
                  <div key={index} className="list-item">
                    <div className="list-icon">{item.icon}</div>
                    <div className="list-content">
                      <h4 className="list-title">{item.title}</h4>
                      <p className="list-org">{item.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="column">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Certifications</h2>
              <div className="list-container">
                {certifications.map((item, index) => (
                  <div key={index} className="list-item">
                    <div className="list-icon">
                      <Award size={32} color="#0ea5e9" />
                    </div>
                    <div className="list-content">
                      <h4 className="list-title">{item.title}</h4>
                      <p className="list-org">{item.org}</p>
                      <a href={item.link} target="_blank" rel="noreferrer" className="cert-link">View Credential</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ marginBottom: '6rem' }}>
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-container">
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Have a project in mind, a question, or just want to say hi? Send me a message!
            </p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email Address" required className="form-input" />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" rows="5" required className="form-input"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={20} /> {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {formStatus === 'success' && <p className="form-success">✨ Message sent successfully! I will get back to you soon.</p>}
              {formStatus === 'error' && <p className="form-error">⚠️ Oops! Something went wrong. Please try again later.</p>}
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
          <p>© {new Date().getFullYear()} Dhawanharan Mahalingam. Built with React.</p>
        </footer>
      </main>
    </>
  );
}

export default App;

// src/components/Features.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      title: "Beat Procrastination",
      description: "Our Eisenhower Matrix automatically prioritizes your tasks so you always know what to tackle first.",
      icon: (
        <svg className="w-8 h-8 text-[var(--color-electric-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Track Everything",
      description: "Real-time analytics show your study patterns, streaks, and progress across all subjects.",
      icon: (
        <svg className="w-8 h-8 text-[var(--color-electric-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Study Together",
      description: "Join virtual study rooms with friends, share progress, and stay accountable together.",
      icon: (
        <svg className="w-8 h-8 text-[var(--color-electric-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    // Scroll animation logic (same as before)
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.fromTo(headerRef.current, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
        
        gsap.fromTo(cardsRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
        );
        
        observer.disconnect(); 
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-navy-dark)] py-24 px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-lavender)] text-transparent bg-clip-text pb-1">
              EduPulse?
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            Everything you need to transform your study habits.
          </p>
        </div>

    {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group bg-[#0b1021] border border-white/5 rounded-3xl p-8 opacity-0
                         transition-all duration-500 ease-in-out
                         hover:border-transparent
                         hover:shadow-[0_0_60px_5px_rgba(0,210,255,0.4),_0_0_100px_10px_rgba(0,210,255,0.2)]"
            >
              {/* UPDATED ICON CONTAINER: Fixed shifting, pure pop-out scale */}
              <div className="mb-6 w-12 h-12 flex items-center justify-start">
                 <div className="transform transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-125 origin-left">
                   {feature.icon}
                 </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
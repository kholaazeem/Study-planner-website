// src/components/PowerfulFeatures.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PowerfulFeatures = () => {
  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const iconsRef = useRef([]);

  const features = [
    {
      title: "Eisenhower Matrix",
      description: "Categorize tasks by urgency and importance. Never waste time on the wrong thing again.",
      icon: (
        <svg className="w-24 h-24 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3m3 3a3 3 0 003-3m-3 3v-3m0 0V4m0 0L9 7m3-3l3 3" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Real-time Analytics",
      description: "Visualize your study habits with beautiful charts. Spot trends and optimize your schedule.",
      icon: (
        <svg className="w-24 h-24 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
          <rect x="4" y="14" width="4" height="6" rx="1" fill="currentColor" />
          <rect x="10" y="8" width="4" height="12" rx="1" fill="currentColor" />
          <rect x="16" y="11" width="4" height="9" rx="1" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Distraction-Free Focus",
      description: "Enter Focus Mode with a Pomodoro timer and calming breathing animations to stay in the zone.",
      icon: (
        <svg className="w-24 h-24 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    iconsRef.current.forEach((icon) => {
      gsap.to(icon, {
        y: -15, 
        rotation: 2, 
        duration: 2.5,
        yoyo: true, 
        repeat: -1, 
        ease: "sine.inOut" 
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('slide-from-left')) {
            gsap.fromTo(entry.target, 
              { x: -100, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
            );
          } else if (entry.target.classList.contains('slide-from-right')) {
            gsap.fromTo(entry.target, 
              { x: 100, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
            );
          }
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.2 });

    slideRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !slideRefs.current.includes(el)) {
      slideRefs.current.push(el);
    }
  };

  return (
    // CHANGED: bg-[var(--color-navy-dark)] ki jagah bg-transparent use kiya
    <section ref={sectionRef} className="w-full bg-transparent py-24 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-white">Powerful </span>
            <span className="text-[var(--color-teal)]">
              Features
            </span>
          </h2>
        </div>

        <div className="space-y-32 md:space-y-40">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0; 

            return (
              <div 
                key={index} 
                className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                
                <div 
                  ref={addToRefs}
                  className={`w-full md:w-1/2 opacity-0 ${isEven ? 'slide-from-left' : 'slide-from-right'}`}
                >
                  <div className="w-full h-56 md:h-[260px] bg-[#05070f] rounded-[2rem] flex items-center justify-center border border-[#a855f7]/20 shadow-[0_0_80px_rgba(168,85,247,0.4)] relative">
                    <div ref={el => iconsRef.current[index] = el} className="relative z-10">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                <div 
                  ref={addToRefs}
                  className={`w-full md:w-1/2 opacity-0 flex flex-col justify-center ${isEven ? 'slide-from-right' : 'slide-from-left'}`}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg">
                    {feature.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PowerfulFeatures;
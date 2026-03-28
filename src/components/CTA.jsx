// src/components/CTA.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CTA = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // 1. Continuous pulsing animation for the button
    gsap.to(buttonRef.current, {
      scale: 1.04, // Halka sa bada hoga
      boxShadow: "0 0 25px rgba(10, 15, 30, 0.4)", // Dark shadow pulse
      duration: 1.2,
      yoyo: true, // Wapas apni original state mein aayega
      repeat: -1, // Infinite chalta rahega
      ease: "sine.inOut" // Bohat smooth transition
    });

    // 2. Scroll Animation: Jab section screen par aaye toh fade-up ho
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.fromTo(sectionRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
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
    <section className="w-full py-24 px-6 relative z-20 overflow-hidden bg-transparent">
      <div 
        ref={sectionRef}
        // Gradient background matching the screenshot
        className="max-w-6xl mx-auto bg-gradient-to-r from-[var(--color-electric-blue)] to-[#9d4edd] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 flex flex-col items-center text-center opacity-0 shadow-[0_0_50px_rgba(157,78,221,0.2)]"
      >
        
        {/* Lightning Icon (Dark colored for contrast) */}
        <div className="mb-6">
          <svg className="w-12 h-12 text-[#0a0f1e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0a0f1e] mb-6 tracking-tight">
          Join Thousands of Students
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#0a0f1e]/80 max-w-2xl mb-12 font-medium leading-relaxed">
          Start your journey to academic excellence today. It's free to get started.
        </p>

        {/* Animated Button */}
        <button 
          ref={buttonRef}
          className="bg-[#0a0f1e] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-black transition-colors"
        >
          <span>Sign Up Now</span>
          {/* Check Circle Icon */}
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

      </div>
    </section>
  );
};

export default CTA;
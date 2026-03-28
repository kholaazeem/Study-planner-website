// src/components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for smooth staggered animations on load
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    // Background slight zoom-in effect
    gsap.fromTo(bgRef.current, 
      { scale: 1.1 }, 
      { scale: 1, duration: 2, ease: 'power2.out' }
    );

    // Text and button sliding up with fade-in
    tl.fromTo(headingRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, delay: 0.2 }
      )
      .fromTo(subheadingRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        "-=0.8"
      )
      // Button Entrance Animation
      .fromTo(buttonRef.current, 
        { y: 20, opacity: 0, scale: 0.9, boxShadow: "0 0 0px rgba(0,210,255,0)" }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          boxShadow: "0 0 15px rgba(0,210,255,0.4)", // Initial light glow
          onComplete: () => {
            // Yahan se Continuous "Bulb/Breathing" Effect shuru hoga
            gsap.to(buttonRef.current, {
              boxShadow: "0 0 40px rgba(0,210,255,0.9)", // Full bright glow
              duration: 1.5,
              repeat: -1,      // Infinite loop
              yoyo: true,      // Wapas reverse hoga (on/off effect)
              ease: "sine.inOut" // Smooth transitions
            });
          }
        }, 
        "-=0.8"
      );
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* 1. Background Image Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat"
      ></div>

      {/* 2. The Magic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-dark)]/80 via-[var(--color-navy-dark)]/50 to-[var(--color-navy-dark)]"></div>

      {/* 3. Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Main Heading */}
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight"
        >
          <span className="block text-white mb-2">Master Your Studies.</span>
          <span className="block bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-lavender)] text-transparent bg-clip-text pb-2">
            Level Up Your Life.
          </span>
        </h1>

        {/* Subheading */}
        <p 
          ref={subheadingRef}
          className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
        >
          The AI-ready planner designed for serious focus, smart organization, and collaborative study. Welcome to EduPulse.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <button 
            ref={buttonRef} 
            // Text color Black kiya gaya hai aur hover shadow hata di gayi hai
            className="group relative px-8 py-4 rounded-xl font-extrabold text-black text-lg flex items-center gap-3 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-lavender)] transition-transform duration-300 hover:-translate-y-1"
          >
            <span>Get Started Free</span>
            {/* Right Arrow SVG */}
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
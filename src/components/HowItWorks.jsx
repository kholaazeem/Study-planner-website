// src/components/HowItWorks.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

  const steps = [
    {
      num: "01",
      title: "Add Tasks",
      description: "Quickly add assignments, exams, and study goals to your smart planner.",
    },
    {
      num: "02",
      title: "Enter Focus Mode",
      description: "Start a Pomodoro session with ambient breathing animations.",
    },
    {
      num: "03",
      title: "Analyze Progress",
      description: "Review your analytics dashboard to understand and improve your habits.",
    }
  ];

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        
        // 1. Animate the vertical line drawing down
        gsap.fromTo(lineRef.current, 
          { height: "0%" }, 
          { height: "100%", duration: 1.5, ease: "power2.inOut" }
        );

        // 2. Animate each step sliding in from the left
        stepsRef.current.forEach((step, index) => {
          gsap.fromTo(step,
            { x: -50, opacity: 0 },
            { 
              x: 0, 
              opacity: 1, 
              duration: 0.8, 
              ease: "power3.out", 
              delay: 0.4 + (index * 0.3) // Staggered delay based on line drawing
            }
          );
        });

        observer.disconnect(); // Stop observing once animated
      }
    }, { threshold: 0.3 }); // Trigger when 30% of section is visible

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-navy-dark)] py-24 px-6 relative z-20 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-white">How It </span>
            <span className="bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-lavender)] text-transparent bg-clip-text pb-1">
              Works
            </span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-2xl mx-auto px-4 md:px-0">
          
          {/* Vertical Line (Animated) */}
          {/* Left-[35px] for mobile, left-[39px] for desktop to align with circles */}
          <div 
            className="absolute top-0 left-[35px] md:left-[39px] w-[2px] bg-gradient-to-b from-gray-700 via-gray-700 to-transparent bottom-0 -z-10"
          >
            {/* Animated Highlight Line */}
            <div 
              ref={lineRef}
              className="w-full bg-gradient-to-b from-[var(--color-electric-blue)] to-[var(--color-lavender)]"
              style={{ height: '0%' }}
            ></div>
          </div>

          {/* Steps List */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={el => stepsRef.current[index] = el}
                className="flex items-start gap-6 md:gap-8 opacity-0"
              >
                
                {/* Step Number Circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#4b6cb7] to-[#182848] border-2 border-transparent shadow-[0_0_20px_rgba(75,108,183,0.4)] flex items-center justify-center">
                    {/* Inner glow/glass effect */}
                    <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-lavender)] opacity-80 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xl md:text-2xl font-bold text-white tracking-wider">
                        {step.num}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="pt-2 md:pt-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
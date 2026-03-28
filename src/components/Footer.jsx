// src/components/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Footer = () => {
  const capRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // 1. Calculate the distance the cap needs to travel based on the line's width
    const lineElement = lineRef.current;
    
    // Resize Observer to recalculate distance if screen size changes
    const resizeObserver = new ResizeObserver(() => {
        if(lineElement && capRef.current) {
            // Cap width is roughly 24px (w-6). We subtract it so it doesn't go outside the line
            const travelDistance = lineElement.offsetWidth - 24; 
            
            // Clear previous animations to avoid conflicts on resize
            gsap.killTweensOf(capRef.current);

            // 2. Continuous Sliding Animation for the Graduation Cap
            gsap.fromTo(capRef.current, 
                { x: 0 }, 
                { 
                    x: travelDistance, 
                    duration: 3, // 3 seconds to travel one way
                    ease: "sine.inOut", // Smooth start and end
                    repeat: -1, // Infinite loop
                    yoyo: true // Go back and forth (Left to Right, Right to Left)
                }
            );
        }
    });

    if(lineElement) {
        resizeObserver.observe(lineElement);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <footer className="w-full bg-[#0b1021] border-t border-[var(--color-navy-blue)] pt-16 pb-8 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 cursor-pointer">
              {/* Lightning Bolt Logo */}
              <svg className="w-6 h-6 text-[var(--color-electric-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-lavender)] bg-clip-text text-transparent tracking-wide">
                EduPulse
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm pr-4">
              The AI-ready planner designed for serious focus and smart organization.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/dashboard" className="text-gray-400 hover:text-[var(--color-electric-blue)] transition-colors text-sm">Dashboard</Link></li>
              <li><Link to="/planner" className="text-gray-400 hover:text-[var(--color-electric-blue)] transition-colors text-sm">Planner</Link></li>
              <li><Link to="/focus" className="text-gray-400 hover:text-[var(--color-electric-blue)] transition-colors text-sm">Focus</Link></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-[var(--color-electric-blue)] transition-colors text-sm">Analytics</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="#" className="text-gray-400 hover:text-[var(--color-lavender)] transition-colors text-sm">About</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[var(--color-lavender)] transition-colors text-sm">Contact</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[var(--color-lavender)] transition-colors text-sm">Privacy</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[var(--color-lavender)] transition-colors text-sm">Terms</Link></li>
            </ul>
          </div>

          {/* Column 4: Progress Map Animation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Progress Map</h4>
            
            {/* Animation Container */}
            <div className="relative mt-2 pt-6 w-full max-w-[200px]" ref={lineRef}>
                
                {/* The Moving Cap */}
                <div 
                    ref={capRef}
                    className="absolute top-0 left-0 text-[var(--color-electric-blue)] drop-shadow-[0_0_8px_rgba(0,210,255,0.6)] z-10"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                </div>

                {/* The Dashed Line with Dots at ends */}
                <div className="flex items-center w-full relative">
                    {/* Start Dot (Cyan) */}
                    <div className="w-2 h-2 rounded-full bg-[var(--color-electric-blue)] shadow-[0_0_5px_rgba(0,210,255,0.5)] absolute left-0 z-0"></div>
                    
                    {/* Dashed Line */}
                    <div className="w-full border-t-2 border-dashed border-gray-600"></div>
                    
                    {/* End Dot (Green/Teal matching screenshot) */}
                    <div className="w-2 h-2 rounded-full bg-[var(--color-teal)] shadow-[0_0_5px_rgba(0,230,118,0.5)] absolute right-0 z-0"></div>
                </div>

            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-white/5 pt-8 text-center flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm">
            © 2026 EduPulse. Built for students, by students.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinksRef = useRef([]); // Links elements ke refs
  const activeBackgroundRef = useRef(null); // Active background div ka ref
  const mobileMenuRef = useRef(null); // Mobile menu container ka ref
  const hamburgerRef = useRef(null); // Hamburger icon ka ref
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Planner', path: '/planner' },
    { name: 'Focus', path: '/focus' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Study Room', path: '/studyroom' },
  ];

  // location change hone pr active state update karein
  useEffect(() => {
    const currentLink = links.find(link => link.path === location.pathname);
    if (currentLink) {
      setActiveLink(currentLink.name);
    } else {
      setActiveLink('');
    }
  }, [location.pathname, links]);

  // GSAP animation for sliding active background - Updated for exact screenshot look
  useEffect(() => {
    const activeLinkElement = navLinksRef.current.find(ref => ref && ref.textContent === activeLink);
    
    if (activeLinkElement && activeBackgroundRef.current) {
      const { offsetWidth, offsetLeft, offsetHeight } = activeLinkElement;
      
      gsap.to(activeBackgroundRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        height: offsetHeight,
        duration: 0.4,
        ease: 'power3.out',
        opacity: 1
      });
    } else if (!activeLink && activeBackgroundRef.current) {
      gsap.to(activeBackgroundRef.current, { opacity: 0 });
    }
  }, [activeLink]);

  // GSAP for Mobile Menu toggle
  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        display: 'flex',
      });
      gsap.to(hamburgerRef.current, { rotate: 90, duration: 0.3, ease: 'sine.out' });
    } else {
      gsap.to(mobileMenuRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        display: 'none',
      });
      gsap.to(hamburgerRef.current, { rotate: 0, duration: 0.3, ease: 'sine.out' });
    }
  }, [isMenuOpen]);

  const handleLinkClick = (name) => {
    setActiveLink(name);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const NavLink = ({ link, index, isMobile }) => {
    const isActive = activeLink === link.name;
    return (
      <li
        key={index}
        className={`${isMobile ? 'block py-4' : 'relative group z-10'}`}
        ref={el => (isMobile ? null : navLinksRef.current[index] = el)}
      >
        <Link
          to={link.path}
          onClick={() => handleLinkClick(link.name)}
          // UPDATED TEXT COLOR LOGIC HERE
          className={`px-6 py-2 block text-center rounded-2xl transition-colors duration-300 ease-in-out font-medium
            ${isActive ? 'text-[var(--color-electric-blue)] drop-shadow-md' : 'text-gray-400 opacity-70 hover:text-white hover:opacity-100'}`}
        >
          {link.name}
        </Link>
      </li>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[var(--color-navy-dark)]/90 border-b border-[var(--color-navy-blue)] px-6 py-4 flex items-center justify-between">
      
      {/* 1. Brand Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="EduPulse Logo" className="h-10 w-auto opacity-0" onLoad={(e) => gsap.to(e.target, {opacity: 1, duration: 0.5, ease: 'sine.in'})}/> 
        <span className="text-3xl font-bold bg-gradient-to-r from-teal to-lavender bg-clip-text text-transparent">
          EduPulse
        </span>
      </div>

      {/* 2. Desktop Navigation Links */}
      <div className="hidden md:block relative px-1">
     {/* ACTIVE BACKGROUND GLOW WALA DIV - INCREASED SHADOW */}
        <div
          ref={activeBackgroundRef}
          className="absolute left-0 top-0 h-full rounded-2xl opacity-0 z-0 pointer-events-none
            bg-[var(--color-navy-dark)] 
            
            shadow-[0_0_25px_rgba(0,210,255,0.6),_inset_0_0_10px_rgba(0,210,255,0.1)]"
          style={{ transform: 'translateX(-100px)' }} 
        ></div>
        
        <ul className="flex items-center gap-1 relative z-10">
          {links.map((link, index) => (
            <NavLink link={link} index={index} key={index} />
          ))}
        </ul>
      </div>

      {/* 3. Action Buttons - Desktop */}
      <div className="hidden md:flex items-center gap-6 z-10">
        <button className="text-white hover:text-lavender transition-colors font-medium">Login</button>
        <button className="px-6 py-2.5 rounded-xl text-white font-semibold
          bg-gradient-to-r from-purple to-[var(--color-electric-blue)]
          shadow-glow shadow-[var(--color-electric-blue)]/20
          hover:shadow-glow-active transition-shadow duration-300">
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Icon (Hamburger) */}
      <div className="md:hidden z-10 flex items-center gap-4">
          <button className="p-2 bg-[var(--color-navy-blue)]/50 rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg ref={hamburgerRef} className={`w-6 h-6 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="white">
                  {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
              </svg>
          </button>
      </div>

      {/* 4. Mobile Menu - Dropdown */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed top-[10%] left-0 w-full h-[90vh] backdrop-blur-xl bg-[var(--color-navy-dark)]/95 border-b border-[var(--color-navy-blue)] flex flex-col items-center pt-20 shadow-2xl z-40 space-y-4"
        style={{ transform: 'translateY(-100%)', opacity: 0 }}
      >
        <ul className="w-full max-w-sm px-6">
          {links.map((link, index) => (
            <NavLink link={link} index={index} key={index} isMobile={true} />
          ))}
        </ul>
        <div className="flex flex-col items-center pt-10 space-y-6">
          <button className="text-white hover:text-lavender transition-colors font-medium">Login</button>
          <button className="w-full max-w-xs px-6 py-2.5 rounded-xl text-white font-semibold
            bg-gradient-to-r from-purple to-[var(--color-electric-blue)]
            shadow-glow shadow-[var(--color-electric-blue)]/20
            hover:shadow-glow-active transition-shadow duration-300">
            Sign Up
          </button>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
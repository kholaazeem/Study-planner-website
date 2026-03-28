// src/components/Cursor.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follow = followRef.current;

    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'sine.out'
      });
      gsap.to(follow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Primary Dot */}
      <div ref={cursorRef} className="fixed w-3 h-3 bg-electric-blue rounded-full pointer-events-none z-[1001]" />
      {/* Slower Follower Trail */}
      <div ref={followRef} className="fixed w-8 h-8 border-2 border-lavender/50 rounded-full pointer-events-none z-[1000] opacity-50" />
    </>
  );
};

export default Cursor;
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Hero from './components/Hero'; // <-- HERO IMPORT KIYA
import Features from './components/Features';
import PowerfulFeatures from './components/PowerfulFeatures';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';

// Updated Home Component
const Home = () => {
  return (
    <main>
      <Hero />
      <Features/>
      <PowerfulFeatures/>
      <HowItWorks/>
      <CTA/>
      <Footer/>
    </main>
  );
};

// Baqi dummy pages waise hi rahenge
const Dashboard = () => <div className="pt-24 min-h-screen text-white text-center">Dashboard Content</div>;
const Planner = () => <div className="pt-24 min-h-screen text-white text-center">Planner Content</div>;
const Focus = () => <div className="pt-24 min-h-screen text-white text-center">Focus Mode Content</div>;
const Analytics = () => <div className="pt-24 min-h-screen text-white text-center">Analytics Content</div>;
const StudyRoom = () => <div className="pt-24 min-h-screen text-white text-center">Study Room Content</div>;

function App() {
  return (
    <Router>
      <div className="bg-[var(--color-navy-dark)] min-h-screen font-sans">
        <Cursor />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/studyroom" element={<StudyRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import HeroSection from './HeroSection';
import TrendingCourses from './TrendingCourses';
import ExpertiseSection from './ExpertiseSection';
import TechStackSection from './TechStackSection';
import TrustedClients from './TrustedClients';
import Testimonials from './Testimonials';

export default function LandingPage({ onStartLearning, onNavigate }) {
  return (
    <div className="space-y-16 py-8 text-slate-800 select-text text-left">
      
      {/* Hero Banner Section */}
      <HeroSection onStartLearning={onStartLearning} onNavigate={onNavigate} />

      {/* Trending Courses Section */}
      <TrendingCourses onNavigate={onNavigate} />

      {/* Expertise Sections */}
      <ExpertiseSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Trusted Clients Logo List */}
      <TrustedClients />

      {/* Testimonials Review Feed */}
      <Testimonials />

    </div>
  );
}

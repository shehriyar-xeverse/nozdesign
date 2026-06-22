import { useState, useEffect } from 'react';
import { PROJECTS } from './data';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import FloatingElements from './components/FloatingElements';

// Noz Design Luxury Interior pages
import {
  HomeSection,
  ProjectDetailSection,
  ProductsSection,
  ServicesSection,
  AboutSection,
  PressSection,
  ContactSection,
} from './pages/InteriorPages';

import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // 1. Reset scroll position on navigation transition
  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [currentPage, selectedProjectId]);

  // 2. SEO & BRANDING Settings (Favicons & Dynamic Titles)
  useEffect(() => {
    let title = 'Noz Design | Luxury Interior Architecture';
    const accentAmber = '%23f59e0b'; // Tailwind Amber #f59e0b

    if (currentPage === 'home') {
      title = 'Noz Design Studio | Luxury Interior Architecture & Bespoke Spaces';
    } else if (currentPage === 'project-detail') {
      const p = PROJECTS.find((item) => item.id === selectedProjectId);
      title = p ? `${p.title} | Noz Design Studio` : 'Project specs | Noz Design';
    } else if (currentPage === 'product') {
      title = 'Curated Lighting Editions | Noz Design Studio';
    } else if (currentPage === 'services') {
      title = 'Our Spatial Design Workflow | Noz Design Studio';
    } else if (currentPage === 'about') {
      title = 'About Noz Nozawa & Designers | Noz Design Studio';
    } else if (currentPage === 'press') {
      title = 'Studio Press Publications | Noz Design Studio';
    } else if (currentPage === 'contact') {
      title = 'Book a Premium Consultation | Noz Design Studio';
    }

    // Set tab title
    document.title = title;

    // Create a custom SVG string to act as dynamic high-fidelity favicon
    const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="${accentAmber}" stroke-width="8"><path d="M25 80V20l50 60V20" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    let faviconLink: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(faviconLink);
    }
    faviconLink.href = `data:image/svg+xml;utf8,${encodeURIComponent(faviconSvg)}`;
  }, [currentPage, selectedProjectId]);

  // Navigate directly into project reviews
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    if (projectId) {
      setCurrentPage('project-detail');
    } else {
      setCurrentPage('home');
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0A0A0A] text-[#f5f5f5] flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      
      {/* Dynamic Cursor system (Visible only on non-touch screen devices >= 1024px) */}
      <CustomCursor />

      {/* Background low-opacity decorative drifting floaters applied globally */}
      <FloatingElements />

      {/* Editorial Design - Background Ambient Glows */}
      <div className="absolute top-[#10%] right-[-10%] w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-amber-800/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Global Navbar Frame */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSelectProject={handleSelectProject}
      />

      {/* Main Page Area Segment Router */}
      <main className="flex-grow pt-24 pb-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {currentPage === 'home' && (
          <HomeSection
            onSelectProject={handleSelectProject}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'project-detail' && (
          <ProjectDetailSection
            selectedProjectId={selectedProjectId}
            onSelectProject={handleSelectProject}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'product' && <ProductsSection />}
        {currentPage === 'services' && <ServicesSection />}
        {currentPage === 'about' && <AboutSection />}
        {currentPage === 'press' && <PressSection />}
        {currentPage === 'contact' && (
          <ContactSection
            onSelectProject={handleSelectProject}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>

      {/* Immersive Dark Editorial Footer Frame */}
      <footer className="glass-premium border-t border-white/5 relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1 Brand specs */}
          <div className="space-y-4">
            <div className="flex flex-col animate-fadeIn">
              <span className="text-lg font-serif tracking-widest text-amber-500 uppercase font-black">
                NOZ DESIGN
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-gray-500 uppercase mt-0.5">
                Est. 2018 San Francisco
              </span>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Merging poetic shadows, handcrafted timbers, and calming acoustic decoupling layers to shape environments worth experiencing.
            </p>
          </div>

          {/* Col 2 Quick Links */}
          <div className="space-y-3 font-mono text-xs text-gray-400">
            <h4 className="text-[10px] tracking-widest text-amber-500 uppercase font-bold">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setCurrentPage('home'); setSelectedProjectId(''); }}
                  className={`hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5 ${currentPage === 'home' ? 'text-amber-500 font-bold' : ''}`}
                >
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Home Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('product')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5 ${currentPage === 'product' ? 'text-amber-500 font-bold' : ''}`}
                >
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Curated Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('services')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5 ${currentPage === 'services' ? 'text-amber-500 font-bold' : ''}`}
                >
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Workflow & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5 ${currentPage === 'about' ? 'text-amber-500 font-bold' : ''}`}
                >
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Principal Creators
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Coordinates contact detail info */}
          <div className="space-y-3 text-xs text-gray-400 font-mono">
            <h4 className="text-[10px] tracking-widest text-amber-500 uppercase font-bold">Coordinates</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>415 Presidio Avenue, San Francisco, CA 94115</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+1 (415) 555-8930</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>hello@nozdesign.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4 Social / Credit lines */}
          <div className="space-y-3 text-xs text-gray-400 font-mono">
            <h4 className="text-[10px] tracking-widest text-amber-500 uppercase font-bold">Connecting Horizons</h4>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[9px] text-gray-600 uppercase mt-4">
              All text content copyable & text selectable. NOZ DESIGN © 2026.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}

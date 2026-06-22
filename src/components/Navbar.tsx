import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { PROJECTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onSelectProject: (projectId: string) => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  onSelectProject
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'projects' | null>(null);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  
  // Responsive dropdown max-height to fit shorter viewports
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState('500px');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Monitor scroll height to add solid blurred backing
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor window resize to maintain optimal dropdown height and auto-close drawers if user expands viewport
  useEffect(() => {
    const handleResize = () => {
      // 1. Calculate dynamic max height for desktop projects dropdown
      const availableHeight = window.innerHeight - 100; // 100px safety padding
      setDropdownMaxHeight(`${Math.max(200, availableHeight)}px`);

      // 2. Auto scale closed if screen expanded
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close desktop projects dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body viewport scrolling when mobile overlay is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Also prevent touchmove default behavior on background page links
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Keyboard accessibility listeners (ESC key to dismiss overlay and active panels)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveDropdown(null);
        setMobileProjectsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleProjectClick = (projectId: string) => {
    onSelectProject(projectId);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  // Safe category filtering
  const residentialProjects = PROJECTS.filter((p) => p.category === 'residential');
  const commercialProjects = PROJECTS.filter((p) => p.category === 'commercial');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'product', label: 'Lighting' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'press', label: 'Press' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Prime Header Block */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-2 sm:py-3'
            : 'bg-[#0A0A0A]/40 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Keyboard-Accessible Brand Logo Button */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex flex-col cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1.5 text-left z-[60]"
              aria-label="Noz Design Studio - Go to Home Portfolio"
            >
              <span className="text-base sm:text-xl lg:text-2xl font-serif tracking-[0.14em] sm:tracking-[0.2em] text-amber-500 font-bold group-hover:text-amber-400 transition-colors uppercase leading-tight">
                NOZ DESIGN
              </span>
              <span className="text-[7.5px] sm:text-[9px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 group-hover:text-amber-500/85 transition-colors">
                INTERIOR ARCHITECTURE
              </span>
            </button>

            {/* Desktop & iPad Pro Navigation (>= 1024px) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Desktop Navigation">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id && !activeDropdown;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-xs xl:text-sm font-medium tracking-widest uppercase transition-colors relative py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm px-1 ${
                      isActive ? 'text-amber-500 font-semibold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline-active"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"
                        transition={{ type: 'spring', stiffness: 385, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}

              {/* Projects Dropdown Menu anchor */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setActiveDropdown('projects')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'projects'}
                  aria-controls="desktop-projects-dropdown"
                  className={`flex items-center gap-1.5 text-xs xl:text-sm font-medium tracking-widest uppercase py-2 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm px-1 ${
                    currentPage === 'project-detail' ? 'text-amber-500 font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Projects
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'projects' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'projects' && (
                    <motion.div
                      id="desktop-projects-dropdown"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      style={{ maxHeight: dropdownMaxHeight }}
                      className="absolute top-8 left-1/2 -translate-x-1/2 w-[240px] bg-[#121111]/98 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl p-4 z-50 overflow-y-auto space-y-4"
                    >
                      <div>
                        <h4 className="text-[9px] font-mono tracking-widest text-amber-500 uppercase border-b border-white/5 pb-1 mb-2 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Residential
                        </h4>
                        <ul className="space-y-0.5">
                          {residentialProjects.map((p) => (
                            <li key={p.id}>
                              <button
                                onClick={() => handleProjectClick(p.id)}
                                className="text-left text-xs text-gray-400 hover:text-amber-400 hover:pl-1 transition-all block py-1.5 font-serif italic cursor-pointer focus:outline-none focus-visible:text-amber-500 w-full"
                              >
                                {p.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[9px] font-mono tracking-widest text-amber-500 uppercase border-b border-white/5 pb-1 mb-2 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Commercial
                        </h4>
                        <ul className="space-y-0.5">
                          {commercialProjects.map((p) => (
                            <li key={p.id}>
                              <button
                                onClick={() => handleProjectClick(p.id)}
                                className="text-left text-xs text-gray-400 hover:text-amber-400 hover:pl-1 transition-all block py-1.5 font-serif italic cursor-pointer focus:outline-none focus-visible:text-amber-500 w-full"
                              >
                                {p.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Mobile & Tablet Interactive Hamburger Trigger (< 1024px) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                className="p-2 -mr-2 rounded-full text-gray-400 hover:text-amber-500 hover:bg-white/5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95 touch-manipulation z-50 flex items-center justify-center"
                style={{ width: '48px', height: '48px' }}
              >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* SIBLING DRAWER: Renders mobile menu fully isolated to guarantee correct stacking & viewport interactions */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark interactive backing overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-40 lg:hidden pointer-events-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer Menu Canvas Body */}
            <motion.div
              id="mobile-navigation-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 h-[100dvh] w-[290px] sm:w-[360px] bg-[#0C0C0C] border-l border-white/10 p-6 pt-24 z-50 lg:hidden flex flex-col justify-between overflow-y-auto scrollbar-thin select-none"
            >
              <div className="flex flex-col gap-4">
                
                {/* Main Navigation Row Pages */}
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left text-lg font-serif tracking-widest uppercase py-2 border-b border-white/5 transition-all focus:outline-none focus-visible:text-amber-500 cursor-pointer ${
                      currentPage === link.id ? 'text-amber-500 font-bold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}

                {/* ACCORDION NESTED PROJECTS DROPDOWN - Custom tactile mobile implementation */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.03 }}
                  className="border-b border-white/5 pb-2"
                >
                  <button
                    onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                    aria-expanded={mobileProjectsOpen}
                    aria-controls="mobile-projects-submenu"
                    className="w-full text-left text-lg font-serif tracking-widest uppercase py-2 transition-all flex items-center justify-between text-gray-300 hover:text-white focus:outline-none focus-visible:text-amber-500 cursor-pointer"
                  >
                    <span>Projects</span>
                    <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${mobileProjectsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileProjectsOpen && (
                      <motion.div
                        id="mobile-projects-submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden pl-4 pr-1 space-y-4 pt-3 pb-2 mt-1"
                      >
                        <div>
                          <h5 className="text-[10px] font-mono tracking-widest text-amber-500/80 uppercase mb-2 font-bold flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-amber-500" />
                            Residential Portfolio
                          </h5>
                          <div className="flex flex-col gap-2 pl-3 border-l border-amber-500/10 mb-2">
                            {residentialProjects.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => handleProjectClick(p.id)}
                                className="text-left text-sm text-gray-400 hover:text-amber-500 transition-colors py-2 font-serif italic truncate active:text-amber-400 focus:outline-none"
                              >
                                {p.title}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-[10px] font-mono tracking-widest text-amber-500/80 uppercase mb-2 font-bold flex items-center gap-1.5 pt-2">
                            <span className="w-1 h-1 rounded-full bg-amber-500" />
                            Commercial Portfolio
                          </h5>
                          <div className="flex flex-col gap-2 pl-3 border-l border-amber-500/10">
                            {commercialProjects.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => handleProjectClick(p.id)}
                                className="text-left text-sm text-gray-400 hover:text-amber-500 transition-colors py-2 font-serif italic truncate active:text-amber-400 focus:outline-none"
                              >
                                {p.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

              </div>

              {/* Minimalist Signature block in Drawer */}
              <div className="pt-6 border-t border-white/5 text-center flex flex-col gap-1 items-center">
                <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">
                  San Francisco Atelier
                </span>
                <span className="text-[7px] font-mono text-gray-700 uppercase tracking-widest">
                  Est. 2018
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

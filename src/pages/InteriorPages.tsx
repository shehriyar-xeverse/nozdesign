import React, { useState, useEffect } from 'react';
import { PROJECTS, PRODUCTS, SERVICES_WORKFLOW, PRESS_ITEMS, TEAM_MEMBERS } from '../data';
import { ProjectId, CuratedProduct } from '../types';
import ThreeDTilt from '../components/ThreeDTilt';
import { ArrowRight, Compass, Shield, Award, Sparkles, MapPin, Calendar, Layers, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ComponentProps {
  onSelectProject: (projectId: string) => void;
  selectedProjectId?: string;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function HomeSection({ onSelectProject, setCurrentPage }: ComponentProps) {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const stories = [
    {
      quote: "Space is an emotional container. It should feel deeply personal, unapologetically authentic, and cinematic.",
      author: "Noz Nozawa, Creator"
    },
    {
      quote: "Lighting is the shadow’s counterpart. We craft dark premium backgrounds to make our amber highlights pop.",
      author: "Julian Carter, Master Weaver"
    },
    {
      quote: "We don't design for catalogs; we design for morning coffee, evening cocktails, and moments of pause.",
      author: "Design Studio Canon"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStoryIdx((prev) => (prev + 1) % stories.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const filteredProjects = PROJECTS.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <div className="space-y-24 pb-20 pt-10">
      
      {/* Immersive Parallax Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden rounded-2xl mx-2 md:mx-6">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80"
            alt="Noz Design Luxury Hero"
            className="w-full h-full object-cover scale-105 animate-[pulse_12s_infinite] brightness-[0.45]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a0a] via-transparent to-black/30" />
        </div>

        {/* Ambient Amber Orbs of Hero */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-amber-500/15 rounded-full blur-3xl mix-blend-screen pointer-events-none" />

        <div className="relative text-center max-w-4xl px-4 md:px-8 space-y-6 z-10 scroll-trigger">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs tracking-[0.25em] text-amber-400 uppercase font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" /> High-End Spatial Craft
          </motion.div>
          
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-7xl font-serif font-black tracking-tight leading-tight text-white editorial-title"
          >
            Crafting Unforgettable <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 underline decoration-amber-500/40 text-glow-amber">
              Atmospheric Spaces
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 font-sans tracking-wide text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            Award-winning interior design studio sculpting cinematic, high-contrast residential homes and wellness sanctuaries with bespoke materials.
          </motion.p>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                const galleryEl = document.getElementById('project-showcase');
                galleryEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              Explore Collection
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 font-bold uppercase tracking-wider text-xs rounded-full transition-all duration-300"
            >
              Consult Studio
            </button>
          </motion.div>
        </div>

        {/* Bottom indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-400 uppercase">Scroll to Discover</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-amber-500 to-transparent animate-[bounce_2s_infinite]" />
        </div>
      </section>

      {/* Rhythmic Narrative Slide Quote */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-6">
        <div className="glass-premium rounded-2xl p-8 md:p-14 border border-white/5 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 blur-3xl rounded-full" />
          <span className="text-7xl font-serif text-amber-500/20 mb-2 select-none">“</span>
          
          <div className="min-h-[140px] flex items-center justify-center">
            <p className="text-xl md:text-3xl font-serif text-gray-200 leading-relaxed font-light">
              {stories[activeStoryIdx].quote}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-amber-500/40" />
            <span className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase font-medium">
              {stories[activeStoryIdx].author}
            </span>
            <div className="w-12 h-[1px] bg-amber-500/40" />
          </div>
        </div>
      </section>

      {/* Curated Interactive Showcase Filters & Grid */}
      <section id="project-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <h2 className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">Interactive Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-white">
              Featured Spaces
            </h3>
          </div>

          {/* Filter switches */}
          <div className="flex flex-wrap sm:flex-nowrap p-1 rounded-2xl sm:rounded-full bg-white/5 border border-white/5 w-full sm:w-auto sm:inline-flex items-center gap-1">
            {(['all', 'residential', 'commercial'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`flex-1 sm:flex-initial text-center px-3 py-2.5 sm:px-6 sm:py-2.5 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-auto cursor-pointer select-none ${
                  filter === opt
                    ? 'bg-amber-500 text-black shadow-lg font-black'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              className="group block"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
            >
              <ThreeDTilt className="relative overflow-hidden rounded-2xl glass-premium border border-white/10 flex flex-col h-full bg-[#121111]">
                {/* Image holder */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-black/75 border border-white/10 text-[9px] tracking-widest text-amber-400 uppercase font-mono font-semibold">
                    {p.category}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 block uppercase">
                      {p.location}
                    </span>
                    <h3 className="text-xl font-serif text-white group-hover:text-amber-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 tracking-wider">
                      {p.year} © Studio Catalog
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 group-hover:text-amber-400 font-bold uppercase tracking-wider transition-colors">
                      View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </ThreeDTilt>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Design Aesthetic Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 text-center">
          <h2 className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">Studio Canon</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-white">
            Space Guidelines
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Bento Item 1 */}
          <div className="glass-premium border border-white/5 p-8 rounded-2xl flex flex-col justify-between gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Compass className="w-6 h-6 text-amber-500" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-serif text-white">Tactile Organic Resonance</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                We believe raw wood, plaster texture, and solid natural stone breathe authentic longevity into contemporary architecture.
              </p>
            </div>
            <div className="text-[11px] font-mono tracking-widest text-amber-500/50 uppercase font-bold border-b border-white/5 pb-1 self-start">
              Axiom I
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="glass-premium border border-white/5 p-8 rounded-2xl flex flex-col justify-between gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Layers className="w-6 h-6 text-amber-500" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-serif text-white">Cinematic Shadow Play</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Dark elements are our framework. By darkening unnecessary surfaces, we carve high contrast paths for ambient warm glowing channels.
              </p>
            </div>
            <div className="text-[11px] font-mono tracking-widest text-amber-500/50 uppercase font-bold border-b border-white/5 pb-1 self-start">
              Axiom II
            </div>
          </div>

          {/* Bento Item 3 */}
          <div className="glass-premium border border-white/5 p-8 rounded-2xl flex flex-col justify-between gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-500" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-serif text-white">Functional Acoustic Decoupling</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Interiors are primarily felt, and next is heard. Our spaces minimize echoes and harsh urban soundwaves using heavy sound decoupling barriers.
              </p>
            </div>
            <div className="text-[11px] font-mono tracking-widest text-amber-500/50 uppercase font-bold border-b border-white/5 pb-1 self-start">
              Axiom III
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export function ProjectDetailSection({
  selectedProjectId,
  onSelectProject,
  setCurrentPage
}: ComponentProps) {
  const project = PROJECTS.find((p) => p.id === selectedProjectId);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-6">
        <h2 className="text-2xl font-serif text-white">Project specifications not resolved</h2>
        <button
          onClick={() => setCurrentPage('home')}
          className="px-6 py-2 border border-amber-500 text-amber-500 uppercase tracking-widest text-xs font-bold rounded-full"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-10 space-y-16">
      
      {/* Return panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            onSelectProject('');
            setCurrentPage('home');
          }}
          className="group inline-flex items-center gap-2 text-xs font-mono tracking-wider font-bold text-gray-400 hover:text-amber-500 uppercase transition-colors"
        >
          ← Return to design collection
        </button>
      </div>

      {/* Big Hero Banner */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-100 transition-all duration-1000 brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a0a] via-transparent to-black/30" />
        
        {/* Absolute branding display overlay */}
        <div className="absolute bottom-12 left-0 w-full z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-amber-500 text-black text-[9px] tracking-widest uppercase font-mono font-black shadow-lg">
                {project.category} SPECIFICATION
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-white editorial-title">
                {project.title}
              </h1>
            </div>

            <div className="flex gap-4 md:gap-12 flex-wrap text-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Location</span>
                  <span className="text-sm font-medium">{project.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Year</span>
                  <span className="text-sm font-medium">{project.year}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Scale Dimensions</span>
                  <span className="text-sm font-medium">{project.size}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main text content columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Structural narrative */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-xs font-mono tracking-widest text-amber-500 uppercase">Design Canon & Narrative</h2>
            <h3 className="text-2xl md:text-3xl font-serif text-white font-medium">
              Spatial Transformation
            </h3>
          </div>
          <p className="text-gray-300 font-sans tracking-wide text-base md:text-lg leading-relaxed font-light">
            {project.longDescription}
          </p>

          <div className="glass-premium rounded-2xl p-6 border border-white/5 space-y-4">
            <h4 className="text-sm font-mono tracking-widest text-amber-500 uppercase">Material pairings & Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex gap-2 items-center">
                <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Wire-brushed solid white oak</span>
              </div>
              <div className="flex gap-2 items-center">
                <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Spanish polished raw travertine</span>
              </div>
              <div className="flex gap-2 items-center">
                <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Textured plaster paint layers</span>
              </div>
              <div className="flex gap-2 items-center">
                <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Raw burnished golden bronze frames</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery sidebar specifications */}
        <div className="lg:col-span-4 glass-premium border border-white/5 rounded-2xl p-6 space-y-6">
          <h4 className="text-xs font-mono tracking-widest text-amber-500 uppercase border-b border-white/5 pb-2 mb-4">
            Project Overview Check
          </h4>
          <ul className="space-y-4 text-sm font-sans">
            <li className="flex justify-between">
              <span className="text-gray-400">Firm Signature</span>
              <span className="text-white font-medium">Noz Design Studio</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Principal Director</span>
              <span className="text-white font-medium">Noz Nozawa</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Construction Craft</span>
              <span className="text-white font-medium">Julian Carter</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Ethereal Theme</span>
              <span className="text-amber-500 font-medium">Dim Amber glow</span>
            </li>
          </ul>

          <button
            onClick={() => setCurrentPage('contact')}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-amber-500/10"
          >
            Enquire About Layout
          </button>
        </div>
      </section>

      {/* Multi-Angle Additional Photography Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <h4 className="text-xs font-mono tracking-widest text-amber-500 uppercase">Perspective Study</h4>
          <h4 className="text-2xl font-serif text-white font-medium">Interlocking Details</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.additionalImages.map((imgUrl, idx) => (
            <div key={idx} className="relative overflow-hidden group rounded-2xl aspect-video glass-premium border border-white/5">
              <img
                src={imgUrl}
                alt={`Additional ${idx}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#0b0a0a]/20 group-hover:bg-[#0b0a0a]/10 transition-colors" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<CuratedProduct | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-10 space-y-16 relative">
      {/* Editorial Ambient Backdrops */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-amber-950/5 rounded-full blur-[110px] pointer-events-none z-0" />
      
      {/* Intro Header */}
      <div className="space-y-4 max-w-3xl">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs tracking-[0.25em] text-amber-400 uppercase font-mono"
        >
          <Sparkles className="w-3.5 h-3.5" /> Curated Lighting Collections
        </motion.span>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-6xl font-serif font-black tracking-tight text-white editorial-title"
        >
          The Amber <br/>Lighting Edition
        </motion.h1>
        <motion.p
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-base md:text-lg font-light leading-relaxed"
        >
          Sculpted raw metals, Spanish alabaster block veins, and fused hand-fired crystalline quartz crafted custom to provide soft ambient streams.
        </motion.p>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {PRODUCTS.map((prod, idx) => (
          <motion.div
            key={prod.id}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <ThreeDTilt
              intensity={16}
              className="glass-premium rounded-2xl border border-white/5 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-amber-500/20 transition-all bg-[#121111]"
            >
              {/* Image Preview */}
              <div className="w-full md:w-2/5 aspect-square rounded-xl overflow-hidden glass-premium flex-shrink-0 relative">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Product description brief */}
              <div className="flex-1 flex flex-col justify-between py-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase">
                      {prod.category}
                    </span>
                    <span className="text-sm font-mono font-bold text-white tracking-tight">
                      {prod.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-white uppercase tracking-tight">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                    {prod.story}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="w-full py-2.5 bg-white/5 hover:bg-amber-400 hover:text-black border border-white/10 hover:border-amber-400 font-semibold text-[10px] tracking-wider uppercase rounded-lg transition-all"
                  >
                    Inspect Specifications
                  </button>
                </div>
              </div>
            </ThreeDTilt>
          </motion.div>
        ))}
      </div>

      {/* Technical specification overlay drawer dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="glass-premium max-w-2xl w-full rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 relative overflow-hidden">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm font-semibold cursor-pointer"
            >
              ✕ Close
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 space-y-3">
                <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl font-serif text-white uppercase">{selectedProduct.name}</h3>
                <span className="inline-block text-xs text-gray-500 font-mono">
                  Designed by: {selectedProduct.designer}
                </span>
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  {selectedProduct.story}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                Technical Data Sheet
              </h4>
              <ul className="space-y-2 text-xs text-gray-400 font-mono">
                {selectedProduct.specs.map((spec, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-500/50" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-colors mt-2"
            >
              Order Specification Consultation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ServicesSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-10 space-y-16 relative">
      {/* Editorial Ambient Backdrops */}
      <div className="absolute top-[15%] right-[-5%] w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] left-[-5%] w-[380px] h-[380px] bg-amber-950/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Narrative block */}
      <div className="max-w-3xl space-y-4">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs tracking-[0.25em] text-amber-400 uppercase font-mono"
        >
          <Layers className="w-3.5 h-3.5" /> Seamless Project Realization
        </motion.span>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-serif font-black tracking-tight text-white editorial-title"
        >
          Our Spatial Workflow
        </motion.h1>
        <motion.p
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-base md:text-lg font-light leading-relaxed"
        >
          Four distinct phases mapping initial ethereal dreams down to handcrafted custom plaster, architectural panel adjustments, and fully custom electrical installation staging.
        </motion.p>
      </div>

      {/* Step workflow listing */}
      <div className="space-y-8 relative before:absolute before:top-4 before:bottom-4 before:left-6 md:before:left-1/2 before:w-[2px] before:bg-white/5">
        
        {SERVICES_WORKFLOW.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ x: isEven ? 40 : -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col md:flex-row items-stretch gap-6 relative z-10 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline marker */}
              <div className="absolute left-6 md:left-1/2 -translate-x-[11px] top-4 w-5 h-5 rounded-full bg-[#0b0a0a] border-4 border-amber-500 shadow-[0_0_8px_#f59e0b]" />

              {/* Layout Content Box */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                <ThreeDTilt
                  intensity={20}
                  className="glass-premium rounded-2xl border border-white/5 p-8 space-y-4 relative overflow-hidden bg-[#121111]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-amber-500">
                      {step.phase}
                    </span>
                    <span className="text-xs text-gray-500 font-mono font-light">
                      Duration: {step.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-white font-medium">
                     {step.title}
                  </h3>

                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <h4 className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                      Action Phase Outputs
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-400">
                      {step.deliverables.map((del, i) => (
                        <li key={i} className="flex gap-2 items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ThreeDTilt>
              </div>

              {/* Empty spacing side for balancing layout on desktop */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-10 space-y-20 relative">
      {/* Editorial Ambient Backdrops */}
      <div className="absolute top-[10%] left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-[5%] w-[320px] h-[320px] bg-amber-950/5 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Intro section with images */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs tracking-[0.25em] text-amber-400 uppercase font-mono"
          >
            <Award className="w-3.5 h-3.5" /> High Architectural Integrity
          </motion.span>
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-6xl font-serif font-black tracking-tight text-white editorial-title"
          >
            Narrating Spaces Since 2018
          </motion.h1>
          <motion.p
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 text-base md:text-lg font-light leading-relaxed"
          >
            Headquartered in San Francisco, Noz Design has built a global reputation for breathing evocative dark-premium themes punctuation by bespoke, high-contrast details. Led by Noz Nozawa, our work spans from cozy residential lightwells to massive, ground-breaking state-of-the-art commercial veterinary sanctuaries.
          </motion.p>
          <motion.p
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-gray-400 text-sm font-light leading-relaxed"
          >
            Every material is inspect personally, from matching spanish slate strata veins to directing exact wood wire brushing depths. We partner with only the finest local blacksmiths, glass-makers, and lighting architects.
          </motion.p>
        </div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden glass-premium border border-white/5"
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            alt="Interior about"
            className="w-full h-full object-cover brightness-90 shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Recognition awards bar */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8 pt-6 border-t border-white/5"
      >
        <h4 className="text-xs font-mono tracking-widest text-amber-500 uppercase text-center">
          Distinguished Honors
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="glass-premium border border-white/5 p-4 rounded-xl">
            <h5 className="text-lg font-serif text-white">AD 100</h5>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Top 100 Architectural Firms</span>
          </div>
          <div className="glass-premium border border-white/5 p-4 rounded-xl">
            <h5 className="text-lg font-serif text-white">Elle Decor</h5>
            <span className="text-[10px] font-mono text-gray-500 uppercase">A-List Talent Showcase</span>
          </div>
          <div className="glass-premium border border-white/5 p-4 rounded-xl">
            <h5 className="text-lg font-serif text-white">Luxe Gold</h5>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Residential Design Master</span>
          </div>
          <div className="glass-premium border border-white/5 p-4 rounded-xl">
            <h5 className="text-lg font-serif text-white">IDA Awards</h5>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Bespoke Fitting Winner</span>
          </div>
        </div>
      </motion.section>

      {/* Team cards listing */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-amber-500 uppercase"
          >
            The Minds Behind
          </motion.h2>
          <motion.h3
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-serif text-white"
          >
            Principal Creators
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -40 : 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ThreeDTilt
                className="glass-premium rounded-2xl border border-white/5 p-6 flex flex-col md:flex-row gap-6 bg-[#121111]"
              >
                <div className="w-full md:w-2/5 aspect-[4/5] rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif text-white">{member.name}</h4>
                    <span className="text-xs text-amber-500 font-mono block uppercase">
                      {member.role}
                    </span>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-gray-600 block uppercase">
                    Connected: SAN FRANCISCO
                  </span>
                </div>
              </ThreeDTilt>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function PressSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 pb-24 pt-10 space-y-12 relative">
      {/* Editorial Ambient Backdrops */}
      <div className="absolute top-[30%] right-[-10%] w-[320px] h-[320px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[280px] h-[280px] bg-amber-950/5 rounded-full blur-[90px] pointer-events-none z-0" />
      
      <div className="space-y-4 text-center">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs tracking-[0.25em] text-amber-400 uppercase font-mono"
        >
          <Award className="w-3.5 h-3.5" /> High editorial coverage
        </motion.span>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-serif font-black tracking-tight text-white editorial-title"
        >
          Studio in Print
        </motion.h1>
        <motion.p
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed"
        >
          Read curated highlights from world-class publications featuring our latest installations, lighting editions, and residential project maps.
        </motion.p>
      </div>

      <div className="space-y-6">
        {PRESS_ITEMS.map((press, i) => (
          <motion.div
            key={i}
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <a
              href={press.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-premium rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-amber-500/20 transition-all bg-[#121111]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">
                    {press.publication}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-amber-300 transition-colors">
                    {press.title}
                  </h3>
                  <span className="text-xs text-gray-500 font-mono block">{press.date}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs text-gray-400 group-hover:text-white font-mono uppercase font-bold transition-all self-start md:self-auto shrink-0 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  Read Article ↗
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Residential Project',
    details: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      setStatus('error');
      return;
    }
    // Simulate API request complete successfully
    setStatus('success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
      {/* Editorial Ambient Backdrops */}
      <div className="absolute top-[20%] left-[-15%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-[-10%] w-[320px] h-[320px] bg-amber-950/5 rounded-full blur-[110px] pointer-events-none z-0" />
      
      {/* Descriptive call */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs tracking-[0.25em] text-amber-400 uppercase font-mono"
        >
          <Sparkles className="w-3.5 h-3.5" /> Book a Consultation
        </motion.span>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-6xl font-serif font-black tracking-tight text-white editorial-title"
        >
          Let’s Form <br/>Your Horizon
        </motion.h1>
        <motion.p
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-sm md:text-base font-light leading-relaxed"
        >
          Ready to transform your environment into a cinematic masterpiece of comfort, material play, and shadow? Set up your discovery call with our San Francisco based architecture team.
        </motion.p>

        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="pt-6 border-t border-white/5 space-y-4 text-xs text-gray-400 font-mono"
        >
          <div>
            <span className="text-amber-500 font-bold block uppercase tracking-wider">SF Headquarters</span>
            <span>415 Presidio Avenue, San Francisco, CA 94115</span>
          </div>
          <div>
            <span className="text-amber-500 font-bold block uppercase tracking-wider">Email Inquiry</span>
            <span>hello@nozdesign.com</span>
          </div>
        </motion.div>
      </div>

      {/* Main interactive form */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="lg:col-span-7 glass-premium border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden bg-[#121111]"
      >
        
        {status === 'success' ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif text-white">Consultation request logged!</h3>
            <p className="text-gray-300 text-sm max-w-sm mx-auto font-light leading-relaxed">
              Julian or Noz will review your spatial description and connect with architectural feedback within two business days.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({ name: '', email: '', serviceType: 'Residential Project', details: '' });
              }}
              className="px-6 py-2 border border-amber-500 text-amber-500 uppercase tracking-widest text-xs font-bold rounded-full"
            >
              Log Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-serif text-white font-medium border-b border-white/5 pb-3">
              Design Request Intake
            </h3>

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
                ⚠ Please completely fill out your name, email, and description details before logging.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g., Alistair Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0b0a0a] border border-white/10 focus:border-amber-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Contact Email</label>
                <input
                  type="email"
                  placeholder="e.g., alistair@vance.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0b0a0a] border border-white/10 focus:border-amber-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Project Category</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full bg-[#0b0a0a] border border-white/10 focus:border-amber-500 text-white rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
              >
                <option value="Residential Estate">Residential Estate remodel</option>
                <option value="Commercial Space">Hospitality / Commercial project</option>
                <option value="Veterinary Clinic Concept">Bespoke Healing Clinic space</option>
                <option value="Consulting Advisory">Hourly Architecture Advisory</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Brief Space Description & Scope</label>
              <textarea
                rows={4}
                placeholder="e.g., Standard double height living room requiring solid wood wire-brushed beams, natural fireplace stone..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-[#0b0a0a] border border-white/10 focus:border-amber-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg hover:shadow-amber-500/15"
            >
              Submit Design Brief
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

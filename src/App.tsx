import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import BottomMascot from './components/BottomMascot';
import IntroPreloader from './components/IntroPreloader';
import { useInertialScroll, ElasticSection } from './components/SmoothElasticScroll';

function App() {
  const [introDone, setIntroDone] = useState(false);

  // Activate global inertial friction smooth scrolling
  useInertialScroll();

  return (
    <div className="min-h-screen text-stone-900 selection:bg-amber-200 selection:text-stone-900 font-sans relative">
      {/* Black Editorial Intro + 3D Flipping Tiles Reveal */}
      {!introDone && <IntroPreloader onComplete={() => setIntroDone(true)} />}

      {/* Stationary Fixed Dotted Background */}
      <div className="fixed inset-0 bg-dotted-fixed pointer-events-none z-0" aria-hidden="true" />

      <div className="relative z-10">
        <main>
          <ElasticSection>
            <Hero />
          </ElasticSection>
          <ElasticSection>
            <Projects />
          </ElasticSection>
          <ElasticSection>
            <About />
          </ElasticSection>
          <ElasticSection>
            <Skills />
          </ElasticSection>
          <ElasticSection>
            <Experience />
          </ElasticSection>
          <ElasticSection>
            <Contact />
          </ElasticSection>
        </main>
      </div>

      <BottomMascot />
      <ScrollToTop />
    </div>
  );
}

export default App;

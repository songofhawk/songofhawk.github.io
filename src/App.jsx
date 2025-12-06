import React from 'react';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import BlogSection from './components/BlogSection';
import FeaturedApps from './components/FeaturedApps';

// TODO: Replace with your actual GitHub username
const GITHUB_USERNAME = 'songofhawk';

function App() {
  return (
    <main>
      <Hero />
      <FeaturedApps />
      <ProjectGrid username={GITHUB_USERNAME} />
      <BlogSection />

      <footer className="container section" style={{
        textAlign: 'center',
        opacity: 0.6,
        fontSize: '0.875rem',
        marginTop: 'auto',
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Vibe Coding. Built with React & Vite.</p>
      </footer>
    </main>
  );
}

export default App;

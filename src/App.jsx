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
      <BlogSection />
      <ProjectGrid username={GITHUB_USERNAME} />

      <footer className="container section" style={{
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        marginTop: 'auto'
      }}>
        <p>&copy; {new Date().getFullYear()} Vibe Coding. Built with React & Vite.</p>
      </footer>
    </main>
  );
}

export default App;

import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import BlogSection from './components/BlogSection';
import FeaturedApps from './components/FeaturedApps';

const GITHUB_USERNAME = 'songofhawk';

function App() {
    return (
        <>
            <Nav />
            <main>
                <Hero />
                <FeaturedApps />
                <ProjectGrid username={GITHUB_USERNAME} />
                <BlogSection />
            </main>
            <footer className="footer">
                <div className="footer-inner">
                    <span>© {new Date().getFullYear()} songofhawk — MIT</span>
                    <span>
                        <span className="ok">●</span> react + vite · no trackers · system fonts only
                    </span>
                </div>
            </footer>
        </>
    );
}

export default App;

import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import BlogSection from './components/BlogSection';
import BlogPost from './components/BlogPost';
import FeaturedApps from './components/FeaturedApps';

const GITHUB_USERNAME = 'songofhawk';

// Hash-based routing keeps GitHub Pages happy (no 404 handling needed).
// "#/blog/42" → post view; anything else → home.
const parseRoute = () => {
    const match = window.location.hash.match(/^#\/blog\/(\d+)$/);
    return match ? { view: 'post', number: Number(match[1]) } : { view: 'home' };
};

function App() {
    const [route, setRoute] = useState(parseRoute);

    useEffect(() => {
        const onHashChange = () => setRoute(parseRoute());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return (
        <>
            <Nav />
            <main>
                {route.view === 'post' ? (
                    <BlogPost number={route.number} />
                ) : (
                    <>
                        <Hero />
                        <FeaturedApps />
                        <ProjectGrid username={GITHUB_USERNAME} />
                        <BlogSection />
                    </>
                )}
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

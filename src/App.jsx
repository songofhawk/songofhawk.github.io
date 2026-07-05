import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import BlogSection from './components/BlogSection';
import BlogPost from './components/BlogPost';
import FeaturedApps from './components/FeaturedApps';

const GITHUB_USERNAME = 'songofhawk';

// Hash-based routing keeps GitHub Pages happy (no 404 handling needed).
// "#/blog/42" → post view; "#/writing" → full writing index; anchors → home.
const parseRoute = () => {
    const blogMatch = window.location.hash.match(/^#\/blog\/(\d+)$/);
    if (blogMatch) return { view: 'post', number: Number(blogMatch[1]) };
    if (window.location.hash === '#/writing') return { view: 'writing' };
    return { view: 'home' };
};

function App() {
    const [route, setRoute] = useState(parseRoute);

    useEffect(() => {
        const onHashChange = () => setRoute(parseRoute());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    useEffect(() => {
        if (route.view !== 'home') return;
        const hash = window.location.hash;
        if (!['#apps', '#writing', '#projects'].includes(hash)) return;
        requestAnimationFrame(() => {
            document.querySelector(hash)?.scrollIntoView();
        });
    }, [route]);

    return (
        <>
            <Nav />
            <main>
                {route.view === 'post' ? (
                    <BlogPost number={route.number} />
                ) : route.view === 'writing' ? (
                    <BlogSection index="01" page />
                ) : (
                    <>
                        <Hero />
                        <FeaturedApps />
                        <BlogSection index="02" limit={4} />
                        <ProjectGrid username={GITHUB_USERNAME} index="03" />
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

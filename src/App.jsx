import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import BlogSection from './components/BlogSection';
import BlogPost from './components/BlogPost';
import FeaturedApps from './components/FeaturedApps';
import { useI18n } from './useI18n';

const GITHUB_USERNAME = 'songofhawk';

const decodeRouteSegment = (segment) => {
    try {
        return decodeURIComponent(segment);
    } catch {
        return segment;
    }
};

// Hash-based routing keeps GitHub Pages happy (no 404 handling needed).
// "#/blog/article-slug" → post view; legacy numeric routes remain supported.
const parseRoute = () => {
    const blogMatch = window.location.hash.match(/^#\/blog\/([^/?#]+)$/);
    if (blogMatch) return { view: 'post', identifier: decodeRouteSegment(blogMatch[1]) };
    if (window.location.hash === '#/writing') return { view: 'writing' };
    return { view: 'home' };
};

function App() {
    const [route, setRoute] = useState(parseRoute);
    const { locale, copy } = useI18n();

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
                    <BlogPost key={`${locale}:${route.identifier}`} identifier={route.identifier} />
                ) : route.view === 'writing' ? (
                    <BlogSection key={`writing:${locale}`} index="01" page />
                ) : (
                    <>
                        <Hero />
                        <FeaturedApps />
                        <BlogSection key={`home-writing:${locale}`} index="02" limit={4} />
                        <ProjectGrid username={GITHUB_USERNAME} index="03" />
                    </>
                )}
            </main>
            <footer className="footer">
                <div className="footer-inner">
                    <span>© {new Date().getFullYear()} songofhawk — MIT</span>
                    <span>
                        <span className="ok">●</span> {copy.footer.stack}
                    </span>
                </div>
            </footer>
        </>
    );
}

export default App;

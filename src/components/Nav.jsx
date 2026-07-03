import React from 'react';
import { useScrollProgress } from '../hooks';

const Nav = () => {
    const progressRef = useScrollProgress();

    return (
        <nav className="nav">
            <div className="nav-inner">
                <a href="#" className="nav-prompt" aria-label="Back to top">
                    <b>songofhawk</b><span className="nav-prompt-tail">@github:<span style={{ color: 'var(--accent)' }}>~</span>$</span>
                </a>
                <div className="nav-links">
                    <a href="#apps">apps</a>
                    <a href="#projects">projects</a>
                    <a href="#writing">writing</a>
                    <a href="https://github.com/songofhawk" target="_blank" rel="noopener noreferrer">github ↗</a>
                </div>
            </div>
            <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
        </nav>
    );
};

export default Nav;

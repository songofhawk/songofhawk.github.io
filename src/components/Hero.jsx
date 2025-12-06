import React from 'react';

const Hero = () => {
    return (
        <section className="section container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <div className="badge" style={{ marginBottom: '1.5rem', animation: 'fade-in-up 0.6s ease-out' }}>
                    👋 Welcome to my digital garden
                </div>

                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: '800',
                    lineHeight: '1.2',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em',
                    animation: 'fade-in-up 0.8s ease-out'
                }}>
                    <span className="text-gradient">Songofhawk</span>
                    <br />
                    <span style={{ color: 'var(--text-primary)' }}>Exploring the Future of Code.</span>
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem',
                    animation: 'fade-in-up 1s ease-out'
                }}>
                    传统程序员能否适应无代码编程？
                    <br />
                    探索人机结合的新思路。
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', animation: 'fade-in-up 1.2s ease-out' }}>
                    <a href="#projects" className="btn btn-primary">
                        View Projects
                    </a>
                    <a href="https://github.com/songofhawk" target="_blank" rel="noopener noreferrer" className="btn btn-glass">
                        GitHub Profile
                    </a>
                </div>
            </div>

            {/* Background Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'var(--gradient-glow)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />
        </section>
    );
};

export default Hero;

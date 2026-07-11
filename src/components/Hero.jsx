import React from 'react';
import { useTypewriter } from '../hooks';
import { useI18n } from '../useI18n';

const Hero = () => {
    const { output, done } = useTypewriter('whoami', 90, 600);
    const { copy } = useI18n();

    return (
        <section className="container" style={{
            paddingTop: '88px',
            paddingBottom: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'center'
        }}>
            <div>
                <p style={{ fontSize: '13px', color: 'var(--accent)', marginBottom: '12px', letterSpacing: '0.08em' }}>
                    {copy.hero.eyebrow}
                </p>
                <h1 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    marginBottom: '12px'
                }}>
                    songofhawk
                </h1>
                <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    maxWidth: '440px',
                    marginBottom: '20px'
                }}>
                    {copy.hero.intro}
                </p>
                <div style={{ display: 'flex', gap: '24px', fontSize: '13px' }}>
                    <a href="#projects" className="link">{copy.hero.projects}</a>
                    <a href="https://github.com/songofhawk" target="_blank" rel="noopener noreferrer" className="link">
                        {copy.hero.github}
                    </a>
                </div>
            </div>

            <div className="term hero-term" aria-hidden="true">
                <div className="term-bar">
                    <span className="dots"><i /><i /><i /></span>
                    <span>zsh — songofhawk</span>
                </div>
                <div className="term-body">
                    <span className="ln">
                        <span className="prompt">$ </span>{output}
                        {!done && <span className="cursor" />}
                    </span>
                    {done && (
                        <>
                            <span className="ln out">song_of_hawk</span>
                            <span className="ln"><span className="prompt">$ </span>cat profile.yaml</span>
                            <span className="ln"><span className="key">role:</span> <span className="val">{copy.hero.terminalRole}</span></span>
                            <span className="ln"><span className="key">focus:</span> <span className="val">{copy.hero.terminalFocus}</span></span>
                            <span className="ln"><span className="key">belief:</span> <span className="val">"{copy.hero.terminalBelief}"</span></span>
                            <span className="ln"><span className="prompt">$ </span><span className="cursor" /></span>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;

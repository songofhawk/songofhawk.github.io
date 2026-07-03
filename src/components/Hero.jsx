import React from 'react';
import { useTypewriter } from '../hooks';

const Hero = () => {
    const { output, done } = useTypewriter('whoami', 90, 600);

    return (
        <section className="container" style={{
            paddingTop: '148px',
            paddingBottom: '88px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
        }}>
            <div>
                <p style={{ fontSize: '13px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '0.08em' }}>
                    // 传统程序员 × 无代码编程
                </p>
                <h1 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    marginBottom: '20px'
                }}>
                    Songofhawk
                </h1>
                <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    maxWidth: '440px',
                    marginBottom: '32px'
                }}>
                    传统程序员能否适应无代码编程?
                    探索人机结合的新思路 —— 用工程直觉,驾驭下一代的编程方式。
                </p>
                <div style={{ display: 'flex', gap: '24px', fontSize: '13px' }}>
                    <a href="#projects" className="link">cd ./projects</a>
                    <a href="https://github.com/songofhawk" target="_blank" rel="noopener noreferrer" className="link">
                        open github ↗
                    </a>
                </div>
            </div>

            <div className="term" aria-hidden="true">
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
                            <span className="ln">&nbsp;</span>
                            <span className="ln"><span className="prompt">$ </span>cat profile.yaml</span>
                            <span className="ln"><span className="key">role:</span> <span className="val">engineer / explorer</span></span>
                            <span className="ln"><span className="key">focus:</span> <span className="val">[vibe-coding, ai-agents, web]</span></span>
                            <span className="ln"><span className="key">belief:</span> <span className="val">"ship &gt; perfect"</span></span>
                            <span className="ln">&nbsp;</span>
                            <span className="ln"><span className="prompt">$ </span><span className="cursor" /></span>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;

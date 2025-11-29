import React from 'react';

const Hero = () => {
    return (
        <section className="section container" style={{
            paddingTop: 'var(--spacing-xl)',
            paddingBottom: 'var(--spacing-lg)',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)',
                letterSpacing: '-0.02em'
            }}>
                Songofhawk
            </h1>
            <p style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.7'
            }}>
                老码农能否适应无代码编程？
                <br />
                探索人机结合的新思路。
            </p>
        </section>
    );
};

export default Hero;

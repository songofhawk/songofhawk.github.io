import React from 'react';

const BlogSection = () => {
    return (
        <section className="container section">
            <h2 style={{
                fontSize: '2rem',
                marginBottom: 'var(--spacing-lg)',
                fontWeight: '700',
                color: 'var(--text-primary)'
            }}>
                <span className="text-gradient">Writing</span>
            </h2>
            <div className="glass-panel" style={{
                padding: '2rem',
                borderLeft: '4px solid var(--secondary)',
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                fontStyle: 'italic',
                background: 'rgba(30, 41, 59, 0.4)'
            }}>
                Thinking in progress...
            </div>
        </section>
    );
};

export default BlogSection;

import React from 'react';

const BlogSection = () => {
    return (
        <section className="container section" style={{ paddingTop: 0 }}>
            <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: 'var(--spacing-md)',
                color: 'var(--text-primary)'
            }}>
                Writing
            </h2>
            <div style={{
                padding: 'var(--spacing-md)',
                borderLeft: '2px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                fontStyle: 'italic'
            }}>
                Thinking in progress...
            </div>
        </section>
    );
};

export default BlogSection;

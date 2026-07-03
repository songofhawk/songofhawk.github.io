import React from 'react';
import SectionHead from './SectionHead';
import { useReveal } from '../hooks';

const BlogSection = () => {
    const ref = useReveal();

    return (
        <section id="writing" className="container section">
            <SectionHead index="03" title="writing" />
            <div
                ref={ref}
                className="reveal"
                style={{
                    border: '1px solid var(--line)',
                    borderLeft: '2px solid var(--accent)',
                    padding: '20px 24px',
                    fontSize: '13px',
                    color: 'var(--text-secondary)'
                }}
            >
                <span style={{ color: 'var(--accent)' }}>$ </span>
                tail -f thoughts.log
                <span style={{ display: 'block', color: 'var(--text-muted)', marginTop: '8px' }}>
                    waiting for new entries<span className="cursor" style={{ height: '0.9em' }} />
                </span>
            </div>
        </section>
    );
};

export default BlogSection;

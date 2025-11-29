import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'block',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: 'var(--spacing-md)',
                transition: 'var(--transition-smooth)',
                height: '100%',
                textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px var(--glow-primary)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-sm)' }}>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                }}>
                    {project.name}
                </h3>
                <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    ★ {project.stargazers_count}
                </span>
            </div>

            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                marginBottom: 'var(--spacing-md)',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {project.description || 'No description available.'}
            </p>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                {project.language && (
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        borderRadius: '100px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-primary)'
                    }}>
                        {project.language}
                    </span>
                )}
            </div>
        </a>
    );
};

export default ProjectCard;

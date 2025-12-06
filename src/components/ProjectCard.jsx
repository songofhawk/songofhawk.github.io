import React from 'react';

const ProjectCard = ({ project, index }) => {
    return (
        <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
                textDecoration: 'none',
                animation: `fade-in-up 0.5s ease-out ${index * 0.1}s backwards`
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-sm)' }}>
                <h3 className="card-title">
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

            <p className="card-desc">
                {project.description || 'No description available.'}
            </p>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginTop: '1rem' }}>
                {project.language && (
                    <span className="badge">
                        {project.language}
                    </span>
                )}
            </div>
        </a>
    );
};

export default ProjectCard;

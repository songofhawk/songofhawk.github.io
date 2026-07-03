import React from 'react';
import { useReveal, useSpotlight } from '../hooks';

const LANG_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572a5',
    Java: '#b07219',
    Go: '#00add8',
    Rust: '#dea584',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    HTML: '#e34c26',
    CSS: '#663399',
    Vue: '#41b883',
    Shell: '#89e051',
    Kotlin: '#a97bff',
    Swift: '#f05138',
    Ruby: '#701516',
    PHP: '#4f5d95',
    Dart: '#00b4ab',
    Lua: '#000080'
};

const timeAgo = (dateString) => {
    const days = Math.floor((Date.now() - new Date(dateString)) / 86400000);
    if (days < 1) return 'today';
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
};

const ProjectCard = ({ project, index }) => {
    const revealRef = useReveal();
    const spotRef = useSpotlight();

    return (
        <div ref={revealRef} className="reveal" style={{ '--reveal-delay': `${(index % 3) * 0.08}s`, display: 'flex' }}>
            <a
                ref={spotRef}
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ flex: 1 }}
            >
                <h3 className="card-title">
                    {project.name}
                    <span className="arrow">↗</span>
                </h3>
                <p className="card-desc">
                    {project.description || '// no description'}
                </p>
                <div className="card-meta">
                    {project.language && (
                        <span className="lang">
                            <span
                                className="lang-dot"
                                style={{ background: LANG_COLORS[project.language] || 'var(--text-muted)' }}
                            />
                            {project.language}
                        </span>
                    )}
                    {project.stargazers_count > 0 && <span>★ {project.stargazers_count}</span>}
                    <span style={{ marginLeft: 'auto' }}>{timeAgo(project.pushed_at || project.updated_at)}</span>
                </div>
            </a>
        </div>
    );
};

export default ProjectCard;

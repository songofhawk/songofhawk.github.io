import React, { useEffect, useState } from 'react';
import { fetchGitHubProjects } from '../services/github';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ username }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            const data = await fetchGitHubProjects(username);
            setProjects(data);
            setLoading(false);
        };

        if (username) {
            loadProjects();
        }
    }, [username]);

    if (loading) {
        return (
            <div className="container section" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                Loading projects...
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="container section" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                No public projects found for {username}.
            </div>
        );
    }

    return (
        <section id="projects" className="container section">
            <h2 style={{
                fontSize: '2rem',
                marginBottom: 'var(--spacing-lg)',
                fontWeight: '700',
                color: 'var(--text-primary)'
            }}>
                <span className="text-gradient">Open Source</span>
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--spacing-md)'
            }}>
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default ProjectGrid;

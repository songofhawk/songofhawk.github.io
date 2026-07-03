import React, { useEffect, useState } from 'react';
import { fetchGitHubProjects } from '../services/github';
import ProjectCard from './ProjectCard';
import SectionHead from './SectionHead';

const INITIAL_COUNT = 12;

const ProjectGrid = ({ username }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

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

    return (
        <section id="projects" className="container section">
            <SectionHead index="02" title="open source" />
            {loading ? (
                <div className="grid">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="skeleton-row" />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    fetch: no public repos found for {username}
                </p>
            ) : (
                <>
                    <div className="grid">
                        {(expanded ? projects : projects.slice(0, INITIAL_COUNT)).map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                    {projects.length > INITIAL_COUNT && (
                        <button
                            className="btn-more"
                            onClick={() => setExpanded(!expanded)}
                        >
                            <span style={{ color: 'var(--accent)' }}>$ </span>
                            {expanded
                                ? 'ls | head -12'
                                : `ls --all  # +${projects.length - INITIAL_COUNT} repos`}
                        </button>
                    )}
                </>
            )}
        </section>
    );
};

export default ProjectGrid;

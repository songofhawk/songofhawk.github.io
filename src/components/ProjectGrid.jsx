import React, { useEffect, useState } from 'react';
import { fetchGitHubProjects } from '../services/github';
import ProjectCard from './ProjectCard';
import SectionHead from './SectionHead';
import { useI18n } from '../useI18n';

const INITIAL_COUNT = 12;

const ProjectGrid = ({ username, index = '02' }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const { copy } = useI18n();

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
            <SectionHead index={index} title={copy.sections.projects} />
            {loading ? (
                <div className="grid">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="skeleton-row" />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {copy.projects.empty(username)}
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
                                ? copy.projects.showLess
                                : copy.projects.showMore(projects.length - INITIAL_COUNT)}
                        </button>
                    )}
                </>
            )}
        </section>
    );
};

export default ProjectGrid;

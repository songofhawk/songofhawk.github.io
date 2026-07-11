import React from 'react';
import SectionHead from './SectionHead';
import { useReveal, useSpotlight } from '../hooks';
import { useI18n } from '../useI18n';

const apps = [
    {
        name: 'snaplab',
        descriptionKey: 'snaplab',
        url: 'https://songofhawk.github.io/snaplab',
        thumb: '/thumbs/snaplab.webp',
        tags: ['wasm', 'ai', 'privacy-first']
    },
    {
        name: 'solar-system-explore',
        descriptionKey: 'solarSystem',
        url: 'https://songofhawk.github.io/solar-system-explore',
        thumb: '/thumbs/solar-system.webp',
        tags: ['3d', 'interactive']
    },
    {
        name: 'doco',
        descriptionKey: 'doco',
        url: 'https://doco-editor.pages.dev/',
        preview: 'doco',
        tags: ['editor', 'tiptap', 'export']
    }
];

const DocoPreview = () => (
    <div className="doco-preview" aria-hidden="true">
        <div className="doco-window">
            <div className="doco-window-bar">
                <span className="doco-dot" />
                <span className="doco-dot" />
                <span className="doco-dot" />
                <span className="doco-path">doco.md</span>
                <span className="doco-export">PDF</span>
            </div>
            <div className="doco-editor">
                <aside className="doco-outline">
                    <span />
                    <span />
                    <span />
                </aside>
                <main className="doco-page">
                    <strong>Doco Editor</strong>
                    <span className="doco-line long" />
                    <span className="doco-line" />
                    <span className="doco-heading" />
                    <span className="doco-line long" />
                    <span className="doco-code" />
                </main>
            </div>
        </div>
    </div>
);

const AppCard = ({ app, index }) => {
    const revealRef = useReveal();
    const spotRef = useSpotlight();
    const { copy } = useI18n();

    return (
        <div ref={revealRef} className="reveal" style={{ '--reveal-delay': `${index * 0.08}s`, display: 'flex' }}>
            <a
                ref={spotRef}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-with-thumb"
                style={{ flex: 1 }}
            >
                <div className={`card-thumb${app.preview ? ` card-thumb-${app.preview}` : ''}`}>
                    {app.preview === 'doco' ? (
                        <DocoPreview />
                    ) : (
                        <img src={app.thumb} alt={copy.apps.screenshot(app.name)} loading="lazy" />
                    )}
                </div>
                <div className="card-body">
                    <h3 className="card-title">
                        {app.name}
                        <span className="arrow">↗</span>
                    </h3>
                    <p className="card-desc">{copy.apps[app.descriptionKey]}</p>
                    <div className="card-meta">
                        {app.tags.map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </a>
        </div>
    );
};

const FeaturedApps = () => {
    const { copy } = useI18n();

    return (
    <section id="apps" className="container section">
        <SectionHead index="01" title={copy.sections.apps} />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {apps.map((app, i) => (
                <AppCard key={app.name} app={app} index={i} />
            ))}
        </div>
    </section>
    );
};

export default FeaturedApps;

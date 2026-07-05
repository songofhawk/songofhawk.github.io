import React from 'react';
import SectionHead from './SectionHead';
import { useReveal, useSpotlight } from '../hooks';

const apps = [
    {
        name: 'snaplab',
        description: '纯浏览器端的图片编辑器 —— AI 分割、背景移除、裁剪、缩放,数据不出本机。',
        url: 'https://songofhawk.github.io/snaplab',
        thumb: '/thumbs/snaplab.webp',
        tags: ['wasm', 'ai', 'privacy-first']
    },
    {
        name: 'solar-system-explore',
        description: '交互式太阳系探索应用,基于 React Three Fiber 构建。',
        url: 'https://songofhawk.github.io/solar-system-explore',
        thumb: '/thumbs/solar-system.webp',
        tags: ['3d', 'interactive']
    },
    {
        name: 'doco',
        description: '轻量文档编辑器,支持富文本、Mermaid / 代码块,并可导出 MD、Word、PDF。',
        url: 'https://github.com/songofhawk/doco',
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
                        <img src={app.thumb} alt={`${app.name} screenshot`} loading="lazy" />
                    )}
                </div>
                <div className="card-body">
                    <h3 className="card-title">
                        {app.name}
                        <span className="arrow">↗</span>
                    </h3>
                    <p className="card-desc">{app.description}</p>
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

const FeaturedApps = () => (
    <section id="apps" className="container section">
        <SectionHead index="01" title="featured apps" />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {apps.map((app, i) => (
                <AppCard key={app.name} app={app} index={i} />
            ))}
        </div>
    </section>
);

export default FeaturedApps;

import React from 'react';

const FeaturedApps = () => {
    const apps = [
        {
            name: 'SnapLab',
            description: '纯浏览器端的图片编辑器，支持AI分割、背景移除、裁剪、调整大小等',
            url: 'https://songofhawk.github.io/snaplab',
            status: 'live', // 'live' or 'coming-soon'
            icon: '🎨'
        },
        {
            name: 'Solar System Explore',
            description: '探索太阳系的交互式应用，由 Google AI Studio 提供支持',
            url: 'https://aistudio.google.com/apps/drive/16ah6ReFNxKSoZ2DtfkqaV8IyrYy-Wapx?showPreview=true&showAssistant=true&fullscreenApplet=true',
            status: 'live',
            icon: '🪐'
        }
    ];

    return (
        <section className="container section">
            <h2 style={{
                fontSize: '2rem',
                marginBottom: 'var(--spacing-lg)',
                fontWeight: '700',
                color: 'var(--text-primary)'
            }}>
                <span className="text-gradient">Featured Apps</span>
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--spacing-md)'
            }}>
                {apps.map((app, index) => (
                    <a
                        key={index}
                        href={app.status === 'live' ? app.url : '#'}
                        target={app.status === 'live' ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="card glass-panel"
                        style={{
                            textDecoration: 'none',
                            cursor: app.status === 'live' ? 'pointer' : 'default',
                            opacity: app.status === 'live' ? 1 : 0.6,
                            animation: `fade-in-up 0.5s ease-out ${index * 0.1}s backwards`
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
                            {app.icon}
                        </div>
                        <h3 className="card-title">
                            {app.name}
                            {app.status === 'coming-soon' && (
                                <span className="badge" style={{ marginLeft: '0.5rem' }}>
                                    Coming Soon
                                </span>
                            )}
                        </h3>
                        <p className="card-desc">
                            {app.description}
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default FeaturedApps;

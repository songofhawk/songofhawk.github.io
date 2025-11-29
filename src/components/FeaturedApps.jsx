import React from 'react';

const FeaturedApps = () => {
    const apps = [
        {
            name: 'Split Image',
            description: '将图片切分成多个小块并下载',
            url: 'https://songofhawk.github.io/split-image/',
            status: 'live', // 'live' or 'coming-soon'
            icon: '🖼️'
        }
    ];

    return (
        <section className="container section" style={{ paddingTop: 0 }}>
            <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: 'var(--spacing-md)',
                color: 'var(--text-primary)'
            }}>
                应用
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
                        style={{
                            display: 'block',
                            background: 'var(--bg-card)',
                            border: '2px solid var(--border-color)',
                            borderRadius: '12px',
                            padding: 'var(--spacing-md)',
                            transition: 'var(--transition-smooth)',
                            textDecoration: 'none',
                            cursor: app.status === 'live' ? 'pointer' : 'default',
                            opacity: app.status === 'live' ? 1 : 0.6
                        }}
                        onMouseEnter={(e) => {
                            if (app.status === 'live') {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.borderColor = 'var(--text-accent)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
                            {app.icon}
                        </div>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            marginBottom: 'var(--spacing-xs)'
                        }}>
                            {app.name}
                            {app.status === 'coming-soon' && (
                                <span style={{
                                    fontSize: '0.75rem',
                                    marginLeft: 'var(--spacing-sm)',
                                    color: 'var(--text-secondary)',
                                    fontWeight: '400'
                                }}>
                                    (即将推出)
                                </span>
                            )}
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem',
                            lineHeight: '1.5'
                        }}>
                            {app.description}
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default FeaturedApps;

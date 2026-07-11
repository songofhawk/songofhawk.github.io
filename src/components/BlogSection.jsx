import React, { useEffect, useState } from 'react';
import SectionHead from './SectionHead';
import { fetchBlogPosts, excerpt, readingMinutes } from '../services/blog';
import { useReveal, useSpotlight } from '../hooks';
import { useI18n } from '../useI18n';

const formatDate = (iso) => iso.slice(0, 10);

const PostRow = ({ post, index }) => {
    const revealRef = useReveal();
    const spotRef = useSpotlight();
    const { copy } = useI18n();

    return (
        <div ref={revealRef} className="reveal" style={{ '--reveal-delay': `${(index % 4) * 0.06}s`, display: 'flex' }}>
            <a ref={spotRef} href={`#/blog/${encodeURIComponent(post.slug)}`} className="card post-row" style={{ flex: 1 }}>
                <div className="post-row-head">
                    <h3 className="card-title">
                        {post.title}
                        <span className="arrow">→</span>
                    </h3>
                    <span className="post-date">{formatDate(post.createdAt)}</span>
                </div>
                <p className="card-desc">{excerpt(post.body)}</p>
                <div className="card-meta">
                    <span>{copy.blog.readingTime(readingMinutes(post.body))}</span>
                    {post.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                    {post.comments > 0 && (
                        <span style={{ marginLeft: 'auto' }}>💬 {post.comments}</span>
                    )}
                </div>
            </a>
        </div>
    );
};

const BlogSection = ({ index = '03', limit, page = false }) => {
    const [posts, setPosts] = useState([]);
    const [state, setState] = useState('loading'); // loading | ready | error
    const emptyRef = useReveal();
    const visiblePosts = typeof limit === 'number' ? posts.slice(0, limit) : posts;
    const { locale, copy } = useI18n();

    useEffect(() => {
        if (!page) return undefined;
        window.scrollTo(0, 0);
        document.title = copy.blog.title;
        return () => { document.title = 'songofhawk@github:~$'; };
    }, [page, copy.blog.title]);

    useEffect(() => {
        let active = true;
        fetchBlogPosts(locale)
            .then((data) => {
                if (!active) return;
                setPosts(data);
                setState('ready');
            })
            .catch(() => {
                if (active) setState('error');
            });
        return () => { active = false; };
    }, [locale]);

    return (
        <section id="writing" className={`container section${page ? ' page-section' : ''}`}>
            <SectionHead index={index} title={copy.sections.writing} />

            {state === 'loading' && (
                <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="skeleton-row" style={{ height: '120px' }} />
                </div>
            )}

            {state === 'error' && (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {copy.blog.error}
                </p>
            )}

            {state === 'ready' && posts.length === 0 && (
                <div
                    ref={emptyRef}
                    className="reveal"
                    style={{
                        border: '1px solid var(--line)',
                        borderLeft: '2px solid var(--accent)',
                        padding: '20px 24px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                    }}
                >
                    <span style={{ color: 'var(--accent)' }}>$ </span>
                    tail -f thoughts.log
                    <span style={{ display: 'block', color: 'var(--text-muted)', marginTop: '8px' }}>
                        {copy.blog.waiting}<span className="cursor" style={{ height: '0.9em' }} />
                    </span>
                </div>
            )}

            {state === 'ready' && posts.length > 0 && (
                <>
                    <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
                        {visiblePosts.map((post, i) => (
                            <PostRow key={post.number} post={post} index={i} />
                        ))}
                    </div>
                    {typeof limit === 'number' && posts.length > visiblePosts.length && (
                        <a href="#/writing" className="btn-more">
                            <span style={{ color: 'var(--accent)' }}>$ </span>
                            {copy.blog.openAll(posts.length - visiblePosts.length)}
                        </a>
                    )}
                </>
            )}
        </section>
    );
};

export default BlogSection;

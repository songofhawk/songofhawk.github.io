import React, { useEffect, useState } from 'react';
import SectionHead from './SectionHead';
import { fetchBlogPosts, excerpt, readingTime } from '../services/blog';
import { useReveal, useSpotlight } from '../hooks';

const formatDate = (iso) => iso.slice(0, 10);

const PostRow = ({ post, index }) => {
    const revealRef = useReveal();
    const spotRef = useSpotlight();

    return (
        <div ref={revealRef} className="reveal" style={{ '--reveal-delay': `${(index % 4) * 0.06}s`, display: 'flex' }}>
            <a ref={spotRef} href={`#/blog/${post.number}`} className="card post-row" style={{ flex: 1 }}>
                <div className="post-row-head">
                    <h3 className="card-title">
                        {post.title}
                        <span className="arrow">→</span>
                    </h3>
                    <span className="post-date">{formatDate(post.createdAt)}</span>
                </div>
                <p className="card-desc">{excerpt(post.body)}</p>
                <div className="card-meta">
                    <span>{readingTime(post.body)}</span>
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

const BlogSection = () => {
    const [posts, setPosts] = useState([]);
    const [state, setState] = useState('loading'); // loading | ready | error
    const emptyRef = useReveal();

    useEffect(() => {
        fetchBlogPosts()
            .then((data) => { setPosts(data); setState('ready'); })
            .catch(() => setState('error'));
    }, []);

    return (
        <section id="writing" className="container section">
            <SectionHead index="03" title="writing" />

            {state === 'loading' && (
                <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="skeleton-row" style={{ height: '120px' }} />
                </div>
            )}

            {state === 'error' && (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    fetch: github api unreachable (rate limit?) — try again later
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
                        waiting for new entries<span className="cursor" style={{ height: '0.9em' }} />
                    </span>
                </div>
            )}

            {state === 'ready' && posts.length > 0 && (
                <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
                    {posts.map((post, i) => (
                        <PostRow key={post.number} post={post} index={i} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default BlogSection;

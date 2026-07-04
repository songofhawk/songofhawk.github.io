import React, { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { fetchBlogPosts, readingTime } from '../services/blog';

const formatDate = (iso) => iso.slice(0, 10);

const BlogPost = ({ number }) => {
    const [post, setPost] = useState(null);
    const [state, setState] = useState('loading');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlogPosts()
            .then((posts) => {
                const found = posts.find((p) => p.number === number);
                if (found) {
                    setPost(found);
                    setState('ready');
                    document.title = `${found.title} — songofhawk`;
                } else {
                    setState('missing');
                }
            })
            .catch(() => setState('error'));
        return () => { document.title = 'songofhawk@github:~$'; };
    }, [number]);

    const html = useMemo(() => {
        if (!post) return '';
        return DOMPurify.sanitize(marked.parse(post.body, { gfm: true, breaks: true }));
    }, [post]);

    return (
        <section className="container" style={{ paddingTop: '108px', paddingBottom: '88px', maxWidth: '820px' }}>
            <a href="#writing" className="link" style={{ fontSize: '13px' }}>cd ..</a>

            {state === 'loading' && (
                <div className="skeleton-row" style={{ height: '200px', marginTop: '32px' }} />
            )}

            {(state === 'error' || state === 'missing') && (
                <p style={{ marginTop: '32px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {state === 'missing' ? `cat: posts/${number}.md: no such file` : 'fetch: github api unreachable — try again later'}
                </p>
            )}

            {state === 'ready' && post && (
                <article style={{ marginTop: '32px' }}>
                    <header style={{ marginBottom: '40px' }}>
                        <p style={{ fontSize: '13px', color: 'var(--accent)', marginBottom: '12px' }}>
                            $ cat posts/{post.number}.md
                        </p>
                        <h1 style={{
                            fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
                            fontWeight: 600,
                            lineHeight: 1.25,
                            letterSpacing: '-0.02em',
                            marginBottom: '16px'
                        }}>
                            {post.title}
                        </h1>
                        <div className="card-meta" style={{ fontSize: '12.5px' }}>
                            <span>{formatDate(post.createdAt)}</span>
                            <span>{readingTime(post.body)}</span>
                            {post.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </header>

                    <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

                    <footer style={{
                        marginTop: '56px',
                        paddingTop: '20px',
                        borderTop: '1px solid var(--line)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        fontSize: '13px'
                    }}>
                        <a href="#writing" className="link">cd ..</a>
                        <a href={post.url} target="_blank" rel="noopener noreferrer" className="link">
                            {post.comments > 0 ? `join ${post.comments} comment${post.comments > 1 ? 's' : ''} on github ↗` : 'comment on github ↗'}
                        </a>
                    </footer>
                </article>
            )}
        </section>
    );
};

export default BlogPost;

import React, { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { fetchBlogPost, readingMinutes } from '../services/blog';
import { useI18n } from '../useI18n';

const formatDate = (iso) => iso.slice(0, 10);

const BlogPost = ({ identifier }) => {
    const [post, setPost] = useState(null);
    const [state, setState] = useState('loading');
    const [isFallback, setIsFallback] = useState(false);
    const { locale, copy } = useI18n();

    useEffect(() => {
        let active = true;
        window.scrollTo(0, 0);
        fetchBlogPost(identifier, locale)
            .then((result) => {
                if (!active) return;
                if (result) {
                    setPost(result.post);
                    setIsFallback(result.isFallback);
                    setState('ready');
                    document.title = `${result.post.title} — songofhawk`;
                    if (/^\d+$/.test(String(identifier))) {
                        window.history.replaceState(null, '', `#/blog/${encodeURIComponent(result.post.slug)}`);
                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                    }
                } else {
                    setPost(null);
                    setState('missing');
                }
            })
            .catch(() => {
                if (active) setState('error');
            });
        return () => {
            active = false;
            document.title = 'songofhawk@github:~$';
        };
    }, [identifier, locale]);

    const html = useMemo(() => {
        if (!post) return '';
        return DOMPurify.sanitize(marked.parse(post.body, { gfm: true, breaks: true }));
    }, [post]);

    return (
        <section className="container" style={{ paddingTop: '108px', paddingBottom: '88px', maxWidth: '820px' }}>
            <a href="#/writing" className="link" style={{ fontSize: '13px' }}>{copy.blog.back}</a>

            {state === 'loading' && (
                <div className="skeleton-row" style={{ height: '200px', marginTop: '32px' }} />
            )}

            {(state === 'error' || state === 'missing') && (
                <p style={{ marginTop: '32px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {state === 'missing' ? copy.blog.missing(identifier) : copy.blog.error}
                </p>
            )}

            {state === 'ready' && post && (
                <article style={{ marginTop: '32px' }}>
                    {isFallback && (
                        <aside className="translation-notice" role="status">
                            <span aria-hidden="true">!</span>
                            {copy.blog.translationFallback}
                        </aside>
                    )}
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
                            <span>{copy.blog.readingTime(readingMinutes(post.body))}</span>
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
                        <a href="#/writing" className="link">{copy.blog.back}</a>
                        <a href={post.discussionUrl} target="_blank" rel="noopener noreferrer" className="link">
                            {copy.blog.comments(post.comments)}
                        </a>
                    </footer>
                </article>
            )}
        </section>
    );
};

export default BlogPost;

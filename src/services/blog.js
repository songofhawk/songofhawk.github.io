const REPO = 'songofhawk/songofhawk.github.io';
const AUTHOR = 'songofhawk';
const CACHE_KEY = 'blog-posts-v1';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const normalize = (issue) => ({
    number: issue.number,
    title: issue.title,
    body: issue.body || '',
    createdAt: issue.created_at,
    comments: issue.comments,
    url: issue.html_url,
    tags: issue.labels
        .map((l) => l.name)
        .filter((name) => name !== 'blog'),
});

/**
 * Blog posts are GitHub issues labeled `blog`, authored by the repo owner.
 * Zero backend: writing a post = opening an issue; comments come free.
 */
export const fetchBlogPosts = async () => {
    try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
            const { at, posts } = JSON.parse(cached);
            if (Date.now() - at < CACHE_TTL) return posts;
        }
    } catch { /* cache is best-effort */ }

    const res = await fetch(
        `https://api.github.com/repos/${REPO}/issues?labels=blog&creator=${AUTHOR}&state=open&per_page=100`,
        { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) {
        throw new Error(res.status === 403 ? 'rate-limited' : `http ${res.status}`);
    }
    const data = await res.json();
    const posts = data
        // the issues API also returns PRs; and only trust the owner's issues
        .filter((it) => !it.pull_request && it.user?.login === AUTHOR)
        .map(normalize);

    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), posts }));
    } catch { /* ignore quota errors */ }
    return posts;
};

/** Strip markdown syntax for a plain-text excerpt. */
export const excerpt = (markdown, maxLen = 120) => {
    const text = markdown
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`([^`]*)`/g, '$1')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/[*_>~-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > maxLen ? `${text.slice(0, maxLen)}…` : text;
};

/** Rough reading time from CJK chars + latin words. */
export const readingMinutes = (markdown) => {
    const cjk = (markdown.match(/[一-鿿]/g) || []).length;
    const words = (markdown.replace(/[一-鿿]/g, ' ').match(/\S+/g) || []).length;
    const minutes = Math.max(1, Math.round(cjk / 350 + words / 200));
    return minutes;
};

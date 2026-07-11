const REPO = 'songofhawk/songofhawk.github.io';
const AUTHOR = 'songofhawk';
const CACHE_PREFIX = 'blog-posts-v2';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const BLOG_LANGUAGES = {
    'zh-CN': 'zh',
    en: 'en',
};

const META_PATTERN = /^\s*<!--\s*blog-meta\s*\n([\s\S]*?)-->\s*/i;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const normalizeLocale = (locale) => locale === 'zh-CN' ? 'zh-CN' : 'en';

const alternateLocale = (locale) => normalizeLocale(locale) === 'zh-CN' ? 'en' : 'zh-CN';

const parseBlogMeta = (source) => {
    const body = source || '';
    const match = body.match(META_PATTERN);
    if (!match) return { meta: {}, body };

    const meta = {};
    match[1].split('\n').forEach((line) => {
        const separator = line.indexOf(':');
        if (separator < 1) return;
        const key = line.slice(0, separator).trim().toLowerCase();
        const value = line.slice(separator + 1).trim();
        if (key && value) meta[key] = value;
    });

    return { meta, body: body.slice(match[0].length) };
};

const normalize = (issue, locale) => {
    const { meta, body } = parseBlogMeta(issue.body);
    const requestedSlug = meta.slug?.toLowerCase();
    const slug = SLUG_PATTERN.test(requestedSlug) ? requestedSlug : `issue-${issue.number}`;
    const requestedDiscussion = Number.parseInt(meta.comments, 10);
    const discussionNumber = Number.isInteger(requestedDiscussion) && requestedDiscussion > 0
        ? requestedDiscussion
        : issue.number;

    return {
        number: issue.number,
        slug,
        locale: normalizeLocale(locale),
        title: issue.title,
        body,
        createdAt: issue.created_at,
        comments: discussionNumber === issue.number ? issue.comments : null,
        discussionUrl: `https://github.com/${REPO}/issues/${discussionNumber}`,
        tags: issue.labels
            .map((label) => label.name)
            .filter((name) => name !== 'blog' && !name.startsWith('lang:')),
    };
};

const readCache = (key) => {
    try {
        const cached = sessionStorage.getItem(key);
        if (!cached) return null;
        const { at, posts } = JSON.parse(cached);
        return Date.now() - at < CACHE_TTL ? posts : null;
    } catch {
        return null;
    }
};

const writeCache = (key, posts) => {
    try {
        sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), posts }));
    } catch { /* cache is best-effort */ }
};

/**
 * Blog posts are GitHub issues labeled `blog` plus `lang:zh` or `lang:en`.
 * The API only returns the requested language; issue-body metadata links translations.
 */
export const fetchBlogPosts = async (locale) => {
    const normalizedLocale = normalizeLocale(locale);
    const language = BLOG_LANGUAGES[normalizedLocale];
    const cacheKey = `${CACHE_PREFIX}:${language}`;
    const cached = readCache(cacheKey);
    if (cached) return cached;

    const params = new URLSearchParams({
        labels: `blog,lang:${language}`,
        creator: AUTHOR,
        state: 'open',
        per_page: '100',
    });
    const res = await fetch(
        `https://api.github.com/repos/${REPO}/issues?${params}`,
        { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) {
        throw new Error(res.status === 403 ? 'rate-limited' : `http ${res.status}`);
    }

    const data = await res.json();
    const posts = data
        // The issues API also returns pull requests; only trust the repository owner.
        .filter((item) => !item.pull_request && item.user?.login === AUTHOR)
        .map((issue) => normalize(issue, normalizedLocale));

    writeCache(cacheKey, posts);
    return posts;
};

const findPost = (posts, identifier) => {
    const value = String(identifier);
    const issueNumber = /^\d+$/.test(value) ? Number(value) : null;
    return posts.find((post) => post.slug === value || post.number === issueNumber);
};

/** Find the requested translation, falling back to the other language when absent. */
export const fetchBlogPost = async (identifier, locale) => {
    const normalizedLocale = normalizeLocale(locale);
    const preferredPosts = await fetchBlogPosts(normalizedLocale);
    const preferred = findPost(preferredPosts, identifier);
    if (preferred) return { post: preferred, isFallback: false };

    const fallbackPosts = await fetchBlogPosts(alternateLocale(normalizedLocale));
    const fallback = findPost(fallbackPosts, identifier);
    return fallback ? { post: fallback, isFallback: true } : null;
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
    return Math.max(1, Math.round(cjk / 350 + words / 200));
};

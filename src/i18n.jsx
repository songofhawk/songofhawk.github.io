import React, { useEffect, useMemo, useState } from 'react';
import { I18nContext } from './i18n-context';

const STORAGE_KEY = 'songofhawk-locale';

const messages = {
    'zh-CN': {
        nav: {
            home: '返回顶部',
            apps: '应用',
            projects: '项目',
            writing: '文章',
            github: 'GitHub ↗',
            language: '界面语言',
        },
        hero: {
            eyebrow: '// 传统程序员 × 无代码编程',
            intro: '多年程序员，始终追随 AI 的脚步。最近沉迷 vibe coding —— 用工程直觉，和模型一起把想法先跑起来。',
            projects: 'cd ./项目',
            github: '打开 GitHub ↗',
            terminalRole: '工程师 / 探索者',
            terminalFocus: '[氛围编程, AI 智能体, Web]',
            terminalBelief: '先做出来',
        },
        sections: {
            apps: '精选应用',
            writing: '文章',
            projects: '开源项目',
        },
        apps: {
            snaplab: '纯浏览器端的图片编辑器 —— AI 分割、背景移除、裁剪、缩放，数据不出本机。',
            solarSystem: '交互式太阳系探索应用，基于 React Three Fiber 构建。',
            doco: '轻量文档编辑器，支持富文本、Mermaid / 代码块，并可导出 MD、Word、PDF。',
            screenshot: (name) => `${name} 应用截图`,
        },
        projects: {
            empty: (username) => `未找到 ${username} 的公开仓库`,
            noDescription: '// 暂无描述',
            showLess: '仅显示前 12 个',
            showMore: (count) => `显示全部  # 还有 ${count} 个仓库`,
            today: '今天',
            daysAgo: (count) => `${count} 天前`,
            monthsAgo: (count) => `${count} 个月前`,
            yearsAgo: (count) => `${count} 年前`,
        },
        blog: {
            title: '文章 — songofhawk',
            error: '无法连接 GitHub API（可能触发了频率限制），请稍后再试',
            waiting: '等待新的文章',
            openAll: (count) => `查看全部文章  # 还有 ${count} 篇`,
            missing: (number) => `找不到第 ${number} 篇文章`,
            comments: (count) => count > 0 ? `在 GitHub 参与 ${count} 条评论 ↗` : '在 GitHub 评论 ↗',
            back: '返回文章列表',
            readingTime: (minutes) => `${minutes} 分钟阅读`,
        },
        footer: {
            stack: 'React + Vite · 无追踪器 · 仅系统字体',
        },
        meta: {
            description: 'songofhawk — 工程师 / 探索者。传统程序员探索无代码编程与人机结合的新思路。',
        },
    },
    en: {
        nav: {
            home: 'Back to top',
            apps: 'apps',
            projects: 'projects',
            writing: 'writing',
            github: 'github ↗',
            language: 'Interface language',
        },
        hero: {
            eyebrow: '// traditional coder × no-code building',
            intro: 'A longtime programmer, always following where AI leads. Lately I have been immersed in vibe coding — pairing engineering intuition with models to turn ideas into working things.',
            projects: 'cd ./projects',
            github: 'open github ↗',
            terminalRole: 'engineer / explorer',
            terminalFocus: '[vibe-coding, ai-agents, web]',
            terminalBelief: 'ship first',
        },
        sections: {
            apps: 'featured apps',
            writing: 'writing',
            projects: 'open source',
        },
        apps: {
            snaplab: 'A browser-only image editor with AI segmentation, background removal, cropping, and resizing. Your data stays on your device.',
            solarSystem: 'An interactive Solar System explorer built with React Three Fiber.',
            doco: 'A lightweight document editor with rich text, Mermaid diagrams, code blocks, and export to Markdown, Word, and PDF.',
            screenshot: (name) => `${name} screenshot`,
        },
        projects: {
            empty: (username) => `No public repositories found for ${username}`,
            noDescription: '// no description',
            showLess: 'show first 12 only',
            showMore: (count) => `show all  # ${count} more repositories`,
            today: 'today',
            daysAgo: (count) => `${count}d ago`,
            monthsAgo: (count) => `${count}mo ago`,
            yearsAgo: (count) => `${count}y ago`,
        },
        blog: {
            title: 'writing — songofhawk',
            error: 'GitHub API unreachable (possibly rate-limited). Please try again later.',
            waiting: 'waiting for new entries',
            openAll: (count) => `open all writing  # ${count} more posts`,
            missing: (number) => `Post ${number} was not found`,
            comments: (count) => count > 0 ? `join ${count} comment${count === 1 ? '' : 's'} on github ↗` : 'comment on github ↗',
            back: 'back to writing',
            readingTime: (minutes) => `${minutes} min read`,
        },
        footer: {
            stack: 'React + Vite · no trackers · system fonts only',
        },
        meta: {
            description: 'songofhawk — engineer / explorer. A traditional programmer exploring no-code building and new ways for humans and AI to work together.',
        },
    },
};

const normalizeLocale = (locale) => locale?.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';

const getInitialLocale = () => {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === 'zh-CN' || saved === 'en') return saved;
    } catch { /* localStorage can be unavailable in privacy modes */ }

    return normalizeLocale(window.navigator.languages?.[0] || window.navigator.language);
};

export const I18nProvider = ({ children }) => {
    const [locale, setLocaleState] = useState(getInitialLocale);

    const setLocale = (nextLocale) => {
        const normalized = normalizeLocale(nextLocale);
        setLocaleState(normalized);
        try {
            window.localStorage.setItem(STORAGE_KEY, normalized);
        } catch { /* persistence is best-effort */ }
    };

    useEffect(() => {
        document.documentElement.lang = locale;
        document.querySelector('meta[name="description"]')?.setAttribute('content', messages[locale].meta.description);
    }, [locale]);

    const value = useMemo(() => ({ locale, setLocale, copy: messages[locale] }), [locale]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

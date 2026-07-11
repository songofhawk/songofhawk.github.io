import React from 'react';
import { useScrollProgress } from '../hooks';
import { useI18n } from '../useI18n';

const Nav = () => {
    const progressRef = useScrollProgress();
    const { locale, setLocale, copy } = useI18n();

    return (
        <nav className="nav">
            <div className="nav-inner">
                <a href="#" className="nav-prompt" aria-label={copy.nav.home}>
                    <b>songofhawk</b><span className="nav-prompt-tail">@github:<span style={{ color: 'var(--accent)' }}>~</span>$</span>
                </a>
                <div className="nav-actions">
                    <div className="nav-links">
                        <a href="#apps">{copy.nav.apps}</a>
                        <a href="#projects">{copy.nav.projects}</a>
                        <a href="#/writing">{copy.nav.writing}</a>
                        <a className="nav-github" href="https://github.com/songofhawk" target="_blank" rel="noopener noreferrer">{copy.nav.github}</a>
                    </div>
                    <div className="language-switch" role="group" aria-label={copy.nav.language}>
                        <button type="button" aria-pressed={locale === 'zh-CN'} onClick={() => setLocale('zh-CN')}>中</button>
                        <button type="button" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
                    </div>
                </div>
            </div>
            <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
        </nav>
    );
};

export default Nav;

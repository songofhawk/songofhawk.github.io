import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Types `text` one character at a time; instant if the user prefers reduced motion. */
export const useTypewriter = (text, speed = 55, startDelay = 300) => {
    const [output, setOutput] = useState(prefersReducedMotion() ? text : '');

    useEffect(() => {
        if (prefersReducedMotion()) return;
        let i = 0;
        let timer;
        const tick = () => {
            i += 1;
            setOutput(text.slice(0, i));
            if (i < text.length) {
                timer = setTimeout(tick, speed + Math.random() * 40);
            }
        };
        timer = setTimeout(tick, startDelay);
        return () => clearTimeout(timer);
    }, [text, speed, startDelay]);

    return { output, done: output === text };
};

/** Adds .is-visible once the element scrolls into view. */
export const useReveal = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
};

/** Tracks pointer position as --mx/--my custom properties for the hover highlight. */
export const useSpotlight = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            el.style.setProperty('--my', `${e.clientY - rect.top}px`);
        };
        el.addEventListener('pointermove', onMove);
        return () => el.removeEventListener('pointermove', onMove);
    }, []);

    return ref;
};

/** Drives the nav scroll-progress hairline via a --scroll custom property. */
export const useScrollProgress = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf = 0;
        const update = () => {
            raf = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            el.style.setProperty('--scroll', max > 0 ? window.scrollY / max : 0);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return ref;
};

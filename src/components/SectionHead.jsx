import React from 'react';
import { useReveal } from '../hooks';

const SectionHead = ({ index, title }) => {
    const ref = useReveal();

    return (
        <div className="section-head reveal" ref={ref}>
            <span className="section-index">{index}</span>
            <h2 className="section-title">{title}</h2>
        </div>
    );
};

export default SectionHead;

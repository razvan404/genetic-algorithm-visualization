import React from 'react';

import styles from './styles/sections.module.css';

type SectionProps = {
    id: string;
    component: React.ReactNode;
};

type Props = {
    sections: SectionProps[];
};

function Sections({ sections }: Props) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const sectionRefs = React.useRef<Record<string, HTMLElement | null>>({});

    React.useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const scrollTop = container.scrollTop;

            let closestSectionId = '';
            let closestDistance = Infinity;

            for (const { id } of sections) {
                const el = sectionRefs.current[id];
                if (el) {
                    const offsetTop = el.offsetTop;
                    const distance = Math.abs(offsetTop - scrollTop);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSectionId = id;
                    }
                }
            }

            const newHash = `#${closestSectionId}`;
            if (window.location.hash !== newHash) {
                history.replaceState(null, '', newHash);
            }
        };

        handleScroll();
        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);

        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, [sections]);

    return (
        <div className={styles.container} ref={containerRef}>
            {sections.map(({ id, component }) => (
                <section
                    key={id}
                    id={id}
                    ref={(element) => {
                        sectionRefs.current[id] = element;
                    }}
                    className={styles.section}
                >
                    {component}
                </section>
            ))}
        </div>
    );
}

export default Sections;

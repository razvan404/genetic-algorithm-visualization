import React from 'react';

import ThemeContext from '../theme';

import { scrollToSection } from './utils';
import styles from './styles/introSection.module.css';

type SubsectionProps = {
    id: string;
    figure?: string;
    title: string;
};

type Props = {
    chapter: number;
    title: string;
    description: React.ReactNode;
    subsections: SubsectionProps[];
};

function IntroSection({ chapter, title, description, subsections }: Props) {
    const { backgroundColor } = React.useContext(ThemeContext);

    return (
        <div className={styles.container} style={{ backgroundColor }}>
            <div className={styles.chapterDetails}>
                <h2>Chapter {chapter}</h2>
                <h1>{title}</h1>
                {description}
            </div>
            <ul className={styles.subsections}>
                {subsections.map((subsection) => (
                    <li
                        key={subsection.id}
                        className={styles.subsection}
                        onClick={() => scrollToSection(subsection.id)}
                    >
                        {subsection.figure && (
                            <img
                                src={subsection.figure}
                                alt={subsection.title}
                                className={styles.subsectionFigure}
                            />
                        )}
                        <span className={styles.subsectionTitle}>
                            {subsection.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IntroSection;

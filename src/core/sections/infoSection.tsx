import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles/infoSection.module.css';
import { scrollToSection } from './utils';

type Props = {
    title: string;
    description: React.ReactNode;
    figure: React.ReactNode;
    backgroundColor?: string;

    nextSectionText?: React.ReactNode;
    nextSectionLink?: string;
};

function InfoSection({
    title,
    description,
    figure,
    backgroundColor,
    nextSectionText,
    nextSectionLink,
}: Props) {
    const navigate = useNavigate();

    const nextSection = React.useMemo(() => {
        if (!nextSectionText) return null;

        const isNextSection =
            nextSectionLink && nextSectionLink.startsWith('#');
        const isNextChapter = nextSectionLink && !isNextSection;

        let text: React.ReactNode = nextSectionText;
        if (isNextSection) {
            text = (
                <>
                    &gt; Next section: <strong>{nextSectionText}</strong>
                </>
            );
        } else if (isNextChapter) {
            text = (
                <>
                    &gt; Next chapter: <strong>{nextSectionText}</strong>
                </>
            );
        }
        return (
            <span
                className={styles.nextSection}
                onClick={() => {
                    if (isNextSection) {
                        scrollToSection(nextSectionLink.slice(1));
                    } else if (isNextChapter) {
                        navigate(nextSectionLink);
                    }
                }}
            >
                {text}
            </span>
        );
    }, [nextSectionText, nextSectionLink]);

    return (
        <div className={styles.container}>
            <div className={styles.textContainer} style={{ backgroundColor }}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                {nextSection}
            </div>
            <div className={styles.figureContainer}>{figure}</div>
        </div>
    );
}

export default InfoSection;

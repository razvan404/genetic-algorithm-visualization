import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import ThemeContext from '../theme';

import { scrollToSection } from './utils';
import styles from './styles/infoSection.module.css';

type Props = {
    title: string;
    description: React.ReactNode;
    figure: React.ReactNode;

    nextSectionText?: React.ReactNode;
    nextSectionLink?: string;
};

function InfoSection({
    title,
    description,
    figure,
    nextSectionText,
    nextSectionLink,
}: Props) {
    const { backgroundColor } = React.useContext(ThemeContext);
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
                className={classNames(styles.nextSection, {
                    [styles.clickable]: isNextSection || isNextChapter,
                })}
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
    }, [nextSectionText, nextSectionLink, navigate]);

    return (
        <div className={styles.container}>
            <div className={styles.textContainer} style={{ backgroundColor }}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.description}>{description}</div>
                {nextSection}
            </div>
            <div className={styles.figureContainer}>{figure}</div>
        </div>
    );
}

export default InfoSection;

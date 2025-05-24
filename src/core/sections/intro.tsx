import styles from './styles/intro.module.css';

type SubsectionProps = {
    id: string;
    figure?: string;
    title: string;
};

type Props = {
    chapter: number;
    title: string;
    description: string;
    subsections: SubsectionProps[];
    backgroundColor?: string;
};

function Intro({
    chapter,
    title,
    description,
    subsections,
    backgroundColor,
}: Props) {
    return (
        <div className={styles.container} style={{ backgroundColor }}>
            <div className={styles.chapterDetails}>
                <h2 className={styles.chapterTitle}>Chapter {chapter}</h2>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </div>
            <ul className={styles.subsections}>
                {subsections.map((subsection) => (
                    <li
                        key={subsection.id}
                        className={styles.subsection}
                        onClick={() => {
                            document
                                .getElementById(subsection.id)
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
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

export default Intro;

import styles from './styles/header.module.css';

type Props = {
    backgroundColor?: string;
};

function Header({ backgroundColor }: Props) {
    return (
        <header className={styles.header} style={{ backgroundColor }}>
            <nav className={styles.nav}>
                <h1 className={styles.navTitle}>
                    Genetic Algorithm Visualization
                </h1>
                <ul className={styles.navList}>
                    <li>
                        <a href="/problem">Problem Definition</a>
                    </li>
                    <li>
                        <a href="/fitness">Fitness Function</a>
                    </li>
                    <li>
                        <a href="/selection">Selection</a>
                    </li>
                    <li>
                        <a href="/crossover">Crossover</a>
                    </li>
                    <li>
                        <a href="/mutation">Mutation</a>
                    </li>
                    <li>
                        <a href="/algorithm">Genetic Algorithm</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

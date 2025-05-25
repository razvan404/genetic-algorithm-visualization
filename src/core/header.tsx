import Routes from '@/routes';

import styles from './styles/header.module.css';

type Props = {
    backgroundColor?: string;
};

const navLinks = [
    { href: Routes.TSP, label: 'Traveling Salesman Problem' },
    { href: Routes.OVERVIEW, label: 'Genetic Algorithm Overview' },
    { href: Routes.FITNESS, label: 'Fitness Function' },
    { href: Routes.CROSSOVER, label: 'Crossover' },
    { href: Routes.MUTATION, label: 'Mutation' },
    { href: Routes.ALGORITHM, label: 'Genetic Algorithm in Action' },
];

function Header({ backgroundColor }: Props) {
    return (
        <header className={styles.header} style={{ backgroundColor }}>
            <nav className={styles.nav}>
                <h1 className={styles.navTitle}>
                    <a href={Routes.HOME}>Genetic Algorithm Visualization</a>
                </h1>
                <ul className={styles.navList}>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href}>
                                {window.location.pathname === link.href ? (
                                    <strong>{link.label}</strong>
                                ) : (
                                    link.label
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;

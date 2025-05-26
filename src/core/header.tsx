import Pages, { getTitle, getRoute } from '@/pages';

import styles from './styles/header.module.css';

type Props = {
    backgroundColor?: string;
};

const navLinks = Object.values(Pages)
    .filter((page) => page !== Pages.HOME)
    .map((page) => ({
        href: getRoute(page),
        label: getTitle(page),
    }));

function Header({ backgroundColor }: Props) {
    return (
        <header className={styles.header} style={{ backgroundColor }}>
            <nav className={styles.nav}>
                <h1 className={styles.navTitle}>
                    <a href={getRoute(Pages.HOME)}>
                        Genetic Algorithm Visualization
                    </a>
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

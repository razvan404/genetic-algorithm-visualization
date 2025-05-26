import Header from './header';
import Footer from './footer';
import ThemeContext, { type Theme } from './theme';
import styles from './styles/overlay.module.css';

type Props = {
    children: React.ReactNode;
    theme: Theme;
};

function Overlay({ children, theme }: Props) {
    return (
        <ThemeContext.Provider value={theme}>
            <Header backgroundColor={theme.headerColor} />
            <div className={styles.container}>{children}</div>
            <Footer backgroundColor={theme.headerColor} />
        </ThemeContext.Provider>
    );
}

export default Overlay;

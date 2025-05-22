import Header from './header';
import Footer from './footer';
import styles from './styles/overlay.module.css';

type Props = {
    children: React.ReactNode;
    backgroundColor?: string;
};

function Overlay({ children, backgroundColor }: Props) {
    return (
        <>
            <Header backgroundColor={backgroundColor} />
            <div className={styles.container}>{children}</div>
            <Footer backgroundColor={backgroundColor} />
        </>
    );
}

export default Overlay;

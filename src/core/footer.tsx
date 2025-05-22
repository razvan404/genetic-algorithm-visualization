import styles from './styles/footer.module.css';

type Props = {
    backgroundColor?: string;
};

function Footer({ backgroundColor }: Props) {
    return (
        <footer className={styles.footer} style={{ backgroundColor }}>
            <p>
                &copy; {new Date().getFullYear()} Genetic Algorithm
                Visualization
            </p>
        </footer>
    );
}

export default Footer;

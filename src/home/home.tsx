import { useNavigate } from 'react-router-dom';

import InteractiveGraph from './interactiveGraph';
import styles from './styles/home.module.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <InteractiveGraph className={styles.graph} />
            <div className={styles.startContainer}>
                <h2>Genetic Algorithm Visualization</h2>
                <p>A visual introduction to genetic algorithms.</p>
                <button
                    className={styles.startButton}
                    onClick={() => navigate('/problem')}
                >
                    Start
                </button>
            </div>
        </div>
    );
}

export default Home;

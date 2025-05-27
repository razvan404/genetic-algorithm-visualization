import React from 'react';
import { useNavigate } from 'react-router-dom';

import InteractiveGraph from './interactiveGraph';
import styles from './styles/home.module.css';
import ThemeContext from '@/core/theme';

function Home() {
    const navigate = useNavigate();
    const { headerColor } = React.useContext(ThemeContext);

    return (
        <div className={styles.container}>
            <InteractiveGraph className={styles.graph} />
            <div
                className={styles.startContainer}
                style={{ backgroundColor: headerColor }}
            >
                <h2>Genetic Algorithm Visualization</h2>
                <p className={styles.startDescription}>
                    A visual introduction to how Genetic Algorithms can <br />
                    be used to solve the Traveling Salesman Problem.
                </p>
                <button
                    className={styles.startButton}
                    onClick={() => navigate('/tsp')}
                >
                    Start
                </button>
            </div>
        </div>
    );
}

export default Home;

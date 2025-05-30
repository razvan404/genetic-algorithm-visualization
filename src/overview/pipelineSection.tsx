import React from 'react';

import { InfoSection } from '@/core';
import gaOverview from '@/assets/gaOverview.png';

import { Sections, getTitle } from './sections';
import styles from './styles/pipelineSection.module.css';

function PipelineSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>
                    A <strong>Genetic Algorithm (GA)</strong> is an optimization
                    method inspired by natural evolution. It works by evolving a
                    population of candidate solutions across generations using
                    mechanisms like selection, crossover, and mutation. Each
                    individual in the population is evaluated with a fitness
                    function, and the best are chosen to pass on their traits.
                </p>

                <p>
                    In the context of the{' '}
                    <strong>Traveling Salesman Problem (TSP)</strong>, each
                    candidate solution is a potential route through all cities.
                    The algorithm iteratively refines these routes to minimize
                    the total distance traveled.
                </p>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>General Description</th>
                            <th>TSP Context</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Initialization</strong>
                            </td>
                            <td>
                                Create a random population of possible solutions
                                (chromosomes).
                            </td>
                            <td>
                                Generate random permutations of cities (routes).
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Fitness Evaluation</strong>
                            </td>
                            <td>Assess how good each chromosome is.</td>
                            <td>
                                Compute total distance of the route — lower is
                                better.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Selection</strong>
                            </td>
                            <td>Choose the best chromosomes to reproduce.</td>
                            <td>Select shorter routes to serve as parents.</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Crossover</strong>
                            </td>
                            <td>
                                Combine parts of two parents to form new
                                offspring.
                            </td>
                            <td>
                                Merge city segments while keeping valid routes.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Mutation</strong>
                            </td>
                            <td>
                                Introduce small random changes to maintain
                                diversity.
                            </td>
                            <td>Swap or reverse city segments in a path.</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Repeat</strong>
                            </td>
                            <td>
                                Evolve the population across generations until a
                                stopping criteria is met.
                            </td>
                            <td>
                                Improve route quality over successive
                                iterations.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        ),
        [],
    );

    const figure = React.useMemo(() => {
        return (
            <>
                <img
                    src={gaOverview}
                    alt="Genetic Algorithm Overview"
                    className={styles.figure}
                />
                <p>
                    Source:{' '}
                    <a
                        href="https://www.neuraldesigner.com/blog/genetic_algorithms_for_feature_selection/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Neural Designer
                    </a>
                </p>
            </>
        );
    }, []);

    return (
        <InfoSection
            title={getTitle(Sections.PIPELINE)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.FITNESS)}
            nextSectionLink={`#${Sections.FITNESS}`}
        />
    );
}

export default {
    id: Sections.PIPELINE,
    component: <PipelineSection />,
};

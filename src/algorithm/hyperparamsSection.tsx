import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function HyperparamsSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>
                    In artificial intelligence and optimization algorithms,
                    hyperparameters are configuration variables set before the
                    algorithm runs. Unlike model parameters (which the algorithm
                    learns), hyperparameters control the overall behavior and
                    performance of the search process.
                </p>
                <p>
                    In this visualization, the Genetic Algorithm used to solve
                    the Traveling Salesman Problem (TSP) includes several
                    hyperparameters. Each influences how the population evolves
                    over time:
                </p>

                <table>
                    <thead>
                        <tr>
                            <th>Hyperparameter</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>populationSize</strong>
                            </td>
                            <td>Number of routes per generation.</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>mutationRate</strong>
                            </td>
                            <td>Chance of random swaps in a route.</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>crossoverRate</strong>
                            </td>
                            <td>Chance two parents create a new child.</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>elitismCount</strong>
                            </td>
                            <td>Top routes preserved without change.</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>maxGenerations</strong>
                            </td>
                            <td>Maximum number of evolution steps.</td>
                        </tr>
                    </tbody>
                </table>
            </>
        ),
        [],
    );

    const figure = React.useMemo(() => {
        return null;
    }, []);

    return (
        <InfoSection
            title={getTitle(Sections.HYPERPARAMS)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.VISUALIZATION)}
            nextSectionLink={`#${Sections.VISUALIZATION}`}
        />
    );
}

export default {
    id: Sections.HYPERPARAMS,
    component: <HyperparamsSection />,
};

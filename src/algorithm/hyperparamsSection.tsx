import React from 'react';

import { InfoSection, LabeledSlider } from '@/core';

import { Sections, getTitle } from './sections';

export type Hyperparams = {
    populationSize: number;
    mutationRate: number;
    crossoverRate: number;
    elitismCount: number;
    maxGenerations: number;
};

export const defaultParams: Hyperparams = {
    populationSize: 100,
    mutationRate: 0.02,
    crossoverRate: 0.7,
    elitismCount: 2,
    maxGenerations: 500,
};

export const HyperparamContext = React.createContext<{
    hyperparams: Hyperparams;
    setHyperparams: React.Dispatch<React.SetStateAction<Hyperparams>>;
}>({ hyperparams: defaultParams, setHyperparams: () => {} });

function HyperparamsSection() {
    const { hyperparams, setHyperparams } = React.useContext(HyperparamContext);

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

    const figure = (
        <div
            style={{
                width: '60%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <LabeledSlider
                label="Population"
                min={10}
                max={200}
                value={hyperparams.populationSize}
                onChange={(val) =>
                    setHyperparams((prev) => ({ ...prev, populationSize: val }))
                }
            />
            <LabeledSlider
                label="Mutation Rate (%)"
                min={0}
                max={100}
                value={Math.round(hyperparams.mutationRate * 100)}
                onChange={(val) =>
                    setHyperparams((prev) => ({
                        ...prev,
                        mutationRate: val / 100,
                    }))
                }
            />
            <LabeledSlider
                label="Crossover Rate (%)"
                min={0}
                max={100}
                value={Math.round(hyperparams.crossoverRate * 100)}
                onChange={(val) =>
                    setHyperparams((prev) => ({
                        ...prev,
                        crossoverRate: val / 100,
                    }))
                }
            />
            <LabeledSlider
                label="Elitism Count"
                min={0}
                max={20}
                value={hyperparams.elitismCount}
                onChange={(val) =>
                    setHyperparams((prev) => ({ ...prev, elitismCount: val }))
                }
            />
            <LabeledSlider
                label="Max Generations"
                min={10}
                max={1000}
                value={hyperparams.maxGenerations}
                onChange={(val) =>
                    setHyperparams((prev) => ({ ...prev, maxGenerations: val }))
                }
            />
        </div>
    );

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

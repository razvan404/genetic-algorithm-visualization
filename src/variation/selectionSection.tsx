import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function SelectionSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>
                    In classical genetic algorithms, <strong>selection</strong>{' '}
                    determines which individuals are chosen to reproduce and
                    pass on their traits to the next generation. Typically,
                    individuals with higher fitness have a greater chance of
                    being selected, simulating the principle of "survival of the
                    fittest." This helps guide the population toward
                    increasingly optimal solutions over successive generations.
                </p>
                <p>Common selection methods include:</p>
                <ul>
                    <li>
                        <strong>Roulette Wheel Selection:</strong> Each
                        individual is assigned a probability proportional to its
                        fitness. Selection is like spinning a wheel weighted by
                        these probabilities.
                    </li>
                    <li>
                        <strong>Tournament Selection:</strong> A random group of
                        individuals competes, and the one with the highest
                        fitness is selected. This can be repeated to fill the
                        next generation.
                    </li>
                    <li>
                        <strong>Rank Selection:</strong> Individuals are ranked
                        by fitness, and selection probabilities are assigned
                        based on rank instead of absolute fitness.
                    </li>
                </ul>
                <p>
                    In the <strong>Traveling Salesman Problem (TSP)</strong>,
                    selection plays a critical role in maintaining path
                    diversity while converging toward shorter tours. Since TSP
                    solutions are represented as permutations of cities,
                    selecting only the best tours too aggressively can cause the
                    population to become similar too early—losing exploration
                    potential.
                </p>
                <p>
                    Therefore, selection in TSP often balances exploration and
                    exploitation. Methods like tournament selection are popular
                    in TSP because they provide control over selective pressure:
                    larger tournaments favor fitter paths, while smaller ones
                    keep more diversity. By carefully tuning this pressure, the
                    algorithm can evolve toward optimal routes while avoiding
                    premature convergence.
                </p>
            </>
        ),
        [],
    );

    const figure = React.useMemo(() => {
        return null;
    }, []);

    return (
        <InfoSection
            title={getTitle(Sections.SELECTION)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.CROSSOVER)}
            nextSectionLink={`#${Sections.CROSSOVER}`}
        />
    );
}

export default {
    id: Sections.SELECTION,
    component: <SelectionSection />,
};

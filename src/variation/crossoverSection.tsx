import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function CrossoverSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>
                    In classical genetic algorithms, <strong>crossover</strong>{' '}
                    is the process of combining genetic information from two
                    parent individuals to create one or more offspring. Inspired
                    by biological reproduction, crossover allows useful traits
                    to be passed down and recombined, leading to potentially
                    better solutions over generations.
                </p>
                <p>
                    For problems with binary or numeric representations,
                    crossover might involve exchanging segments of bit strings
                    or real values. Common techniques include single-point,
                    two-point, or uniform crossover, depending on how genetic
                    material is split and recombined.
                </p>
                <p>
                    In the <strong>Traveling Salesman Problem (TSP)</strong>,
                    however, crossover becomes more complex. Each individual
                    represents a complete tour—a permutation of cities—and
                    blindly swapping segments can easily produce invalid
                    offspring (e.g., duplicate or missing cities).
                </p>
                <p>
                    To address this, specialized crossover operators are used:
                </p>
                <ul>
                    <li>
                        <strong>Order Crossover (OX):</strong> A segment from
                        one parent is preserved, and the rest of the tour is
                        filled from the second parent in the order they appear,
                        skipping duplicates.
                    </li>
                    <li>
                        <strong>Partially-Mapped Crossover (PMX):</strong>{' '}
                        Creates a mapping between two segments and uses it to
                        maintain city positions while resolving conflicts.
                    </li>
                    <li>
                        <strong>Edge Recombination:</strong> Prioritizes
                        preserving edges (i.e., direct city-to-city links) from
                        the parents, which may maintain favorable sub-paths.
                    </li>
                </ul>
                <p>
                    These operators aim to produce valid tours while still
                    enabling the algorithm to explore new combinations of routes
                    and inherit efficient sub-paths from parents.
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
            title={getTitle(Sections.CROSSOVER)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.MUTATIONS)}
            nextSectionLink={`#${Sections.MUTATIONS}`}
        />
    );
}

export default {
    id: Sections.CROSSOVER,
    component: <CrossoverSection />,
};

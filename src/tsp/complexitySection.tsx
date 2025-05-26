import React from 'react';

import { InfoSection, LabeledSlider } from '@/core';
import { formatScientificNotation, factorialApprox } from '@/utils';

import CompleteGraphVisualizer from './completeGraphVisualizer';
import { Sections, Theme, getTitle } from './types';

function ComplexitySection() {
    const [nodeCount, setNodeCount] = React.useState(10);
    const routesCount = formatScientificNotation(factorialApprox(nodeCount));

    const description = React.useMemo(
        () => (
            <>
                <p>
                    The <strong>Traveling Salesman Problem</strong> is
                    classified as an <strong>NP-hard</strong> problem in
                    computational complexity theory. This means that no known
                    algorithm can solve all instances of the problem in
                    polynomial time. For a graph of <code>n</code> cities, the
                    naive brute-force approach involves checking all possible
                    permutations of routes to determine the shortest one.
                </p>

                <p>
                    The total number of possible routes (permutations) is{' '}
                    <strong>(n - 1)!</strong> if the trip is a round tour that
                    returns to the starting city. As a result, the time
                    complexity of the brute-force algorithm is{' '}
                    <strong>O(n!)</strong>.
                </p>

                <p>
                    This factorial growth becomes computationally infeasible
                    very quickly. For example, for <strong>{nodeCount}</strong>{' '}
                    cities, there are at most <strong>{routesCount}</strong>{' '}
                    possible routes.
                </p>

                <LabeledSlider
                    value={nodeCount}
                    onChange={setNodeCount}
                    min={3}
                    max={64}
                    label="Cities"
                />

                <p>
                    There are more efficient approaches like{' '}
                    <strong>dynamic programming</strong> (e.g., the Held-Karp
                    algorithm), which improves the complexity to{' '}
                    <strong>
                        O(n<sup>2</sup>×2<sup>n</sup>)
                    </strong>
                    . While this is a significant improvement over brute-force,
                    it’s still exponential in nature.
                </p>

                <p>
                    Because of this extreme complexity, heuristic and
                    metaheuristic algorithms (like Genetic Algorithms, Simulated
                    Annealing, Ant Colony Optimization, etc.) are often used in
                    practice to find good approximate solutions within
                    reasonable time.
                </p>
            </>
        ),
        [nodeCount, routesCount],
    );

    const figure = React.useMemo(() => {
        return (
            <CompleteGraphVisualizer
                width={600}
                height={600}
                radius={250}
                nodeCount={nodeCount}
                animDurationMs={1200}
                displayCitiesCount
                displayMaxRoutesCount
            />
        );
    }, [nodeCount]);

    return (
        <InfoSection
            title={getTitle(Sections.COMPLEXITY)}
            description={description}
            figure={figure}
            backgroundColor={Theme.BACKGROUND_COLOR}
            nextSectionText={getTitle(Sections.APPLICATIONS)}
            nextSectionLink={`#${Sections.APPLICATIONS}`}
        />
    );
}

export default {
    id: Sections.COMPLEXITY,
    component: <ComplexitySection />,
};

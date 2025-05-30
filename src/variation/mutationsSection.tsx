import React from 'react';

import { InfoSection } from '@/core';
import Pages, { getTitle as getChapterTitle, getRoute } from '@/pages';

import { Sections, getTitle } from './sections';

function MutationsSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>
                    In classical genetic algorithms, <strong>mutation</strong>{' '}
                    introduces small random changes to individuals in the
                    population. Its primary role is to maintain diversity and
                    prevent the algorithm from getting stuck in local optima.
                    Mutation ensures that the search space continues to be
                    explored, even when the population has begun to converge.
                </p>
                <p>
                    For binary or numeric representations, mutation might
                    involve flipping bits or tweaking values slightly. The
                    mutation rate is usually kept low to avoid disrupting
                    well-performing solutions while still allowing exploration
                    of new possibilities.
                </p>
                <p>
                    In the <strong>Traveling Salesman Problem (TSP)</strong>,
                    mutation operates on permutations of cities. Since a valid
                    solution must visit each city exactly once, mutation
                    operators must preserve this constraint while still making
                    meaningful changes to the route.
                </p>
                <p>Common mutation techniques for TSP include:</p>
                <ul>
                    <li>
                        <strong>Swap Mutation:</strong> Two cities are randomly
                        selected and their positions are swapped. This is simple
                        and effective at introducing variability.
                    </li>
                    <li>
                        <strong>Inversion Mutation:</strong> A random segment of
                        the tour is selected and its order is reversed. This can
                        significantly alter the path while preserving structure.
                    </li>
                    <li>
                        <strong>Scramble Mutation:</strong> A subset of cities
                        is randomly shuffled, creating a new sub-route within
                        the same tour.
                    </li>
                </ul>
                <p>
                    Mutation in TSP is crucial for escaping repetitive or
                    suboptimal loops. Even minor adjustments can lead to
                    improved paths when combined with strong selection and
                    crossover strategies.
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
            title={getTitle(Sections.MUTATIONS)}
            description={description}
            figure={figure}
            nextSectionText={getChapterTitle(Pages.ALGORITHM)}
            nextSectionLink={getRoute(Pages.ALGORITHM)}
        />
    );
}

export default {
    id: Sections.MUTATIONS,
    component: <MutationsSection />,
};

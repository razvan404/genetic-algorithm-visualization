import React from 'react';
import { InfoSection, RoundGraphVisualizer } from '@/core';

import { Sections, getTitle } from './sections';

function DefinitionSection() {
    const description = React.useMemo(() => {
        return (
            <>
                <p>
                    The <strong>Traveling Salesman Problem</strong> is a classic
                    problem in the field of combinatorial optimization. It asks
                    a deceptively simple question:
                </p>
                <blockquote>
                    <em>
                        Given a list of cities and the distances between each
                        pair of cities, what is the shortest possible route that
                        visits each city exactly once and returns to the
                        starting city?
                    </em>
                </blockquote>
                <p>
                    While the problem seems easy to understand, solving it is
                    computationally challenging. The number of possible routes
                    grows <strong>factorially</strong> with the number of cities
                    — for just 10 cities, there are over{' '}
                    <code>3.6 million</code> possible routes.
                </p>
                <p>
                    TSP is not just a theoretical curiosity. It appears in many
                    real-world scenarios such as route planning, logistics, DNA
                    sequencing, and circuit design.
                </p>
            </>
        );
    }, []);

    const figure = React.useMemo(() => {
        return (
            <RoundGraphVisualizer
                width={600}
                height={600}
                radius={250}
                animDurationMs={4000}
                edgeProbability={0.8}
                nodeCount={10}
                displayTotalDistance
            />
        );
    }, []);

    return (
        <InfoSection
            title={getTitle(Sections.DEFINITION)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.COMPLEXITY)}
            nextSectionLink={`#${Sections.COMPLEXITY}`}
        />
    );
}

export default {
    id: Sections.DEFINITION,
    component: <DefinitionSection />,
};

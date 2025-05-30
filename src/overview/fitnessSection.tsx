import React from 'react';

import { InfoSection, RoundGraphVisualizer, Histogram } from '@/core';
import Pages, { getTitle as getChapterTitle, getRoute } from '@/pages';

import { Sections, getTitle } from './sections';

function FitnessSection() {
    const [fitnessHistory, setFitnessHistory] = React.useState<number[]>([]);

    const description = React.useMemo(
        () => (
            <>
                <p>
                    In a Genetic Algorithm, the{' '}
                    <strong>fitness function</strong> evaluates how good a
                    candidate solution is. It provides a numerical score that
                    guides the evolutionary process — higher fitness typically
                    means a better solution, and these are more likely to
                    survive and reproduce.
                </p>

                <p>
                    The design of the fitness function depends on the specific
                    problem and must reflect the optimization goal accurately
                    while remaining efficient to compute. A good fitness
                    function helps balance <em>exploration</em> (trying new
                    possibilities) with <em>exploitation</em> (refining known
                    good ones).
                </p>

                <p>
                    In the context of the{' '}
                    <strong>Traveling Salesman Problem (TSP)</strong>, fitness
                    is often calculated as the inverse of the total route
                    distance. Shorter routes result in higher fitness scores. If
                    a route includes invalid edges (e.g. disconnected cities),
                    it receives a penalized score.
                </p>

                <p>
                    On the right, you can generate different random routes
                    (chromosomes) and view their corresponding fitness scores.
                    Routes with invalid edges are highlighted. Bellow, the
                    histogram tracks fitness scores of previously generated
                    routes — illustrating how quality can vary across different
                    samples.
                </p>

                <Histogram
                    data={fitnessHistory}
                    binSize={2}
                    labelX={'Fitness Score'}
                    labelY={'Count'}
                />
            </>
        ),
        [fitnessHistory],
    );

    const figure = React.useMemo(() => {
        return (
            <>
                <RoundGraphVisualizer
                    width={600}
                    height={600}
                    radius={250}
                    nodeCount={8}
                    edgeProbability={0.95}
                    animFadeMs={30}
                    tspPathColor="#FFDE72"
                    onTspPathUpdate={(_path, _distance, fitness) => {
                        if (!fitness) {
                            return;
                        }
                        setFitnessHistory((prevData) => [...prevData, fitness]);
                    }}
                    displayTotalDistance
                    displayCurrentChromosome
                    displayReloadRoute
                    displayReloadRoute50Times
                    displayFitnessScore
                />
            </>
        );
    }, []);

    return (
        <InfoSection
            title={getTitle(Sections.FITNESS)}
            description={description}
            figure={figure}
            nextSectionText={getChapterTitle(Pages.VARIATION)}
            nextSectionLink={getRoute(Pages.VARIATION)}
        />
    );
}

export default {
    id: Sections.FITNESS,
    component: <FitnessSection />,
};

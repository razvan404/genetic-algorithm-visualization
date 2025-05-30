import React from 'react';

import { InfoSection, RoundGraphVisualizer } from '@/core';

import { Sections, getTitle } from './sections';

function RepresentationSection() {
    const description = React.useMemo(
        () => (
            <>
                <>
                    <p>
                        In a Genetic Algorithm, a <strong>chromosome</strong>{' '}
                        represents a potential solution to the problem being
                        optimized. It is composed of <em>genes</em>, where each
                        gene holds a piece of information that contributes to a
                        full solution. The way you represent chromosomes — also
                        called the <em>encoding</em> — plays a crucial role in
                        how effectively the algorithm can evolve better
                        solutions.
                    </p>

                    <p>
                        Before evolution begins, the algorithm must generate an
                        initial population of chromosomes. This{' '}
                        <strong>initialization</strong> step typically creates
                        diverse, randomly generated individuals to cover a broad
                        area of the search space. A well-designed initialization
                        strategy ensures a strong starting point for the
                        algorithm to explore from.
                    </p>

                    <p>
                        In the case of the{' '}
                        <strong>Traveling Salesman Problem (TSP)</strong>, each
                        chromosome is a <em>permutation</em> of city indices,
                        representing a full tour. A valid chromosome must visit
                        each city exactly once and return to the starting city.
                        During initialization, the algorithm generates random
                        permutations of the cities to form the initial
                        population. Because of the strict validity constraints,
                        standard crossover and mutation operators need to be
                        carefully adapted to preserve valid routes.
                    </p>
                </>
            </>
        ),
        [],
    );

    const figure = React.useMemo(() => {
        return (
            <div style={{ display: 'flex', gap: '20px' }}>
                <RoundGraphVisualizer
                    title="Chromosomes in a Complete Graph"
                    subtitle="there are not invalid connections"
                    width={400}
                    height={400}
                    radius={150}
                    nodeCount={8}
                    tspPathColor='#FFDE72'
                    displayCurrentChromosome
                    displayReloadRoute
                />
                <RoundGraphVisualizer
                    title="Chromosomes in a Partial Graph"
                    subtitle="red edges represent invalid connections"
                    width={400}
                    height={400}
                    radius={150}
                    nodeCount={8}
                    tspPathColor='#FFDE72'
                    edgeProbability={0.7}
                    displayCurrentChromosome
                    displayReloadRoute
                />
            </div>
        );
    }, []);

    return (
        <InfoSection
            title={getTitle(Sections.REPRESENTATION)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.FITNESS)}
            nextSectionLink={`#${Sections.FITNESS}`}
        />
    );
}

export default {
    id: Sections.REPRESENTATION,
    component: <RepresentationSection />,
};

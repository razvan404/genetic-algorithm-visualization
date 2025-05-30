import React from 'react';

import { IntroSection } from '@/core';

import { Sections, getTitle } from './sections';

function AlgorithmIntroSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>
                    This chapter brings everything together by presenting the
                    full Genetic Algorithm in action. You’ll be able to interact
                    with its components, observe how populations evolve over
                    generations, and see how crossover, mutation, and selection
                    shape the search for optimal solutions.
                </p>
                <p>
                    It begins by introducing key{' '}
                    <strong>hyperparameters</strong> that influence the
                    algorithm’s behavior, followed by a{' '}
                    <strong>step-by-step visualization</strong> of the
                    evolutionary process as it solves the{' '}
                    <strong>Traveling Salesman Problem</strong>.
                </p>
            </>
        ),
        [],
    );

    return (
        <IntroSection
            chapter={4}
            title={getTitle(Sections.INTRO)}
            description={description}
            subsections={Object.values(Sections)
                .filter((section) => section !== Sections.INTRO)
                .map((section) => ({
                    id: section,
                    title: getTitle(section),
                    figure: `/vite.svg`,
                }))}
        />
    );
}

export default {
    id: Sections.INTRO,
    component: <AlgorithmIntroSection />,
};

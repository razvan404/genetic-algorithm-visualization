import React from 'react';

import { IntroSection } from '@/core';

import { Sections, getTitle } from './sections';

function VariationIntroSection() {
    const description = React.useMemo(
        () => (
            <p>
                Genetic population variation is the core mechanism that allows
                genetic algorithms to explore and optimize solutions. Through
                selection, crossover, and mutation, each generation introduces
                new individuals, gradually improving the overall population.
                This chapter explores how these variation methods shape the
                evolutionary process and drive progress in solving problems like
                the Traveling Salesman Problem.
            </p>
        ),
        [],
    );

    return (
        <IntroSection
            chapter={3}
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
    component: <VariationIntroSection />,
};

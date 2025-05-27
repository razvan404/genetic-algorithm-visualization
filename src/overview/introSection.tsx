import React from 'react';

import { IntroSection } from '@/core';

import { Sections, getTitle } from './sections';

function OverviewIntroSection() {
    const description = React.useMemo(
        () => (
            <p>
                This chapter introduces the core ideas behind Genetic Algorithms
                - how a population of candidate solutions evolves over time
                using fitness evaluation and selection. It will also be
                presented how these principles can be used to tackle complex
                problems like the Traveling Salesman Problem.
            </p>
        ),
        [],
    );

    return (
        <IntroSection
            chapter={2}
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
    component: <OverviewIntroSection />,
};

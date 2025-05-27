import React from 'react';

import { IntroSection } from '@/core';

import { Sections, getTitle } from './sections';

function TspIntroSection() {
    const description = React.useMemo(
        () => (
            <p>
                The <strong>Traveling Salesman Problem (TSP)</strong> is a
                classic optimization problem in computer science and operations
                research. It involves finding the shortest possible route that
                visits a set of cities and returns to the origin city.
            </p>
        ),
        [],
    );

    return (
        <IntroSection
            chapter={1}
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
    component: <TspIntroSection />,
};

import { IntroSection } from '@/core';

import { Sections, Theme } from './types';

function TspIntroSection() {
    return (
        <IntroSection
            chapter={1}
            title="Traveling Salesman Problem"
            description="The Traveling Salesman Problem (TSP) is a classic optimization problem in computer science and operations research. It involves finding the shortest possible route that visits a set of cities and returns to the origin city."
            subsections={[
                {
                    id: Sections.DEFINITION,
                    title: 'Problem Definition',
                    figure: '/vite.svg',
                },
                {
                    id: Sections.COMPLEXITY,
                    title: 'Problem Complexity',
                    figure: '/vite.svg',
                },
                {
                    id: Sections.APPLICATIONS,
                    title: 'Applications',
                    figure: '/vite.svg',
                },
            ]}
            backgroundColor={Theme.BACKGROUND_COLOR}
        />
    );
}

export default {
    id: Sections.INTRO,
    component: <TspIntroSection />,
};

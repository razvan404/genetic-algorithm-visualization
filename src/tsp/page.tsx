import React from 'react';
import { Overlay, Sections, IntroSection } from '@/core';

function TspPage() {
    const introSection = React.useMemo(
        () => ({
            id: 'intro',
            component: (
                <IntroSection
                    chapter={1}
                    title="Traveling Salesman Problem"
                    description="The Traveling Salesman Problem (TSP) is a classic optimization problem in computer science and operations research. It involves finding the shortest possible route that visits a set of cities and returns to the origin city."
                    subsections={[
                        {
                            id: 'definition',
                            title: 'Problem Definition',
                            figure: '/vite.svg',
                        },
                        {
                            id: 'complexity',
                            title: 'Problem Complexity',
                            figure: '/vite.svg',
                        },
                        {
                            id: 'applications',
                            title: 'Applications',
                            figure: '/vite.svg',
                        },
                    ]}
                    backgroundColor="#FFFED1"
                />
            ),
        }),
        [],
    );

    const sections = [
        introSection,
        {
            id: 'definition',
            component: <h2>Problem Definition</h2>,
        },
        {
            id: 'complexity',
            component: <h2>Problem Complexity</h2>,
        },
        {
            id: 'applications',
            component: <h2>Applications</h2>,
        },
    ];

    return (
        <Overlay backgroundColor="rgba(253, 249, 128, 0.4)">
            <Sections sections={sections} />
        </Overlay>
    );
}

export default TspPage;

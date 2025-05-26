import React from 'react';

import tspApplications from '@/assets/tspApplications.png';
import { InfoSection } from '@/core';
import Pages, { getRoute, getTitle as getChapterTitle } from '@/pages';

import { Sections, getTitle } from './sections';

function ApplicationsSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>
                    The <strong>Traveling Salesman Problem (TSP)</strong> is not
                    just a theoretical challenge — it appears in many real-world
                    problems where optimal routes or sequences matter. Because
                    it models the task of visiting each location exactly once
                    while minimizing cost, time, or distance, TSP has
                    applications across logistics, biology, and even
                    electronics.
                </p>

                <ul>
                    <li>
                        <strong>Logistics & Transportation:</strong> Delivery
                        trucks, garbage collection routes, school bus planning.
                    </li>
                    <li>
                        <strong>Manufacturing:</strong> Tool path optimization
                        in CNC machines to reduce material and time waste.
                    </li>
                    <li>
                        <strong>Genomics & Bioinformatics:</strong> DNA
                        sequencing assembly and genome scaffolding tasks.
                    </li>
                    <li>
                        <strong>Computer Chip Design:</strong> Minimizing wire
                        length and latency in circuit layout.
                    </li>
                    <li>
                        <strong>Tour Planning:</strong> Travel itinerary
                        optimization, museum route planning, sales rep visits.
                    </li>
                </ul>

                <p>
                    In each of these cases, the underlying goal remains the
                    same: find the most efficient way to traverse a set of
                    discrete tasks or locations with minimal overhead — making
                    the TSP one of the most widely applicable problems in
                    computer science and operations research.
                </p>
            </>
        ),
        [],
    );

    const figure = React.useMemo(
        () => (
            <img
                src={tspApplications}
                alt="TSP Applications"
                style={{ width: 600 }}
            />
        ),
        [],
    );

    return (
        <InfoSection
            title={getTitle(Sections.APPLICATIONS)}
            description={description}
            figure={figure}
            nextSectionText={getChapterTitle(Pages.OVERVIEW)}
            nextSectionLink={getRoute(Pages.OVERVIEW)}
        />
    );
}

export default {
    id: Sections.APPLICATIONS,
    component: <ApplicationsSection />,
};

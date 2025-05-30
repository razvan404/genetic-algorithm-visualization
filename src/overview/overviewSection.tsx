import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function OverviewSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>example</p>
            </>
        ),
        [],
    );

    const figure = React.useMemo(() => {
        return null;
    }, []);

    return (
        <InfoSection
            title={getTitle(Sections.OVERVIEW)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.FITNESS)}
            nextSectionLink={`#${Sections.FITNESS}`}
        />
    );
}

export default {
    id: Sections.OVERVIEW,
    component: <OverviewSection />,
};

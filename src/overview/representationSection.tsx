import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function RepresentationSection() {
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

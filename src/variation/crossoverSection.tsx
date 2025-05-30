import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function CrossoverSection() {
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
            title={getTitle(Sections.CROSSOVER)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.MUTATIONS)}
            nextSectionLink={`#${Sections.MUTATIONS}`}
        />
    );
}

export default {
    id: Sections.CROSSOVER,
    component: <CrossoverSection />,
};

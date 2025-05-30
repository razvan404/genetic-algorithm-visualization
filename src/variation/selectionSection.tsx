import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function SelectionSection() {
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
            title={getTitle(Sections.SELECTION)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.CROSSOVER)}
            nextSectionLink={`#${Sections.CROSSOVER}`}
        />
    );
}

export default {
    id: Sections.SELECTION,
    component: <SelectionSection />,
};

import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function HyperparamsSection() {
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
            title={getTitle(Sections.HYPERPARAMS)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.VISUALIZATION)}
            nextSectionLink={`#${Sections.VISUALIZATION}`}
        />
    );
}

export default {
    id: Sections.HYPERPARAMS,
    component: <HyperparamsSection />,
};

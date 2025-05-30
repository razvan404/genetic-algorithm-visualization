import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function VisualizationSection() {
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
            title={getTitle(Sections.VISUALIZATION)}
            description={description}
            figure={figure}
            nextSectionText={"Thank you for reading!"}
        />
    );
}

export default {
    id: Sections.VISUALIZATION,
    component: <VisualizationSection />,
};

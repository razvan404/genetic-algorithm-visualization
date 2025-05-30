import React from 'react';

import { InfoSection } from '@/core';
import Pages, { getTitle as getChapterTitle, getRoute } from '@/pages';

import { Sections, getTitle } from './sections';

function FitnessSection() {
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
            title={getTitle(Sections.FITNESS)}
            description={description}
            figure={figure}
            nextSectionText={getChapterTitle(Pages.VARIATION)}
            nextSectionLink={getRoute(Pages.VARIATION)}
        />
    );
}

export default {
    id: Sections.FITNESS,
    component: <FitnessSection />,
};

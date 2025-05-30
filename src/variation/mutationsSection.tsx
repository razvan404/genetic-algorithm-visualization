import React from 'react';

import { InfoSection } from '@/core';
import Pages, { getTitle as getChapterTitle, getRoute } from '@/pages';

import { Sections, getTitle } from './sections';

function MutationsSection() {
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
            title={getTitle(Sections.MUTATIONS)}
            description={description}
            figure={figure}
            nextSectionText={getChapterTitle(Pages.ALGORITHM)}
            nextSectionLink={getRoute(Pages.ALGORITHM)}
        />
    );
}

export default {
    id: Sections.MUTATIONS,
    component: <MutationsSection />,
};

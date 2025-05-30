import React from 'react';

import { IntroSection } from '@/core';

import { Sections, getTitle } from './sections';

function AlgorithmIntroSection() {
    const description = React.useMemo(() => <p>example</p>, []);

    return (
        <IntroSection
            chapter={3}
            title={getTitle(Sections.INTRO)}
            description={description}
            subsections={Object.values(Sections)
                .filter((section) => section !== Sections.INTRO)
                .map((section) => ({
                    id: section,
                    title: getTitle(section),
                    figure: `/vite.svg`,
                }))}
        />
    );
}

export default {
    id: Sections.INTRO,
    component: <AlgorithmIntroSection />,
};

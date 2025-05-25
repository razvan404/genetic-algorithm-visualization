import { Overlay, Sections } from '@/core';

import introSection from './introSection';
import definitionSection from './definitionSection';
import complexitySection from './complexitySection';
import applicationsSection from './applicationsSection';
import { Theme } from './types';

function TspPage() {
    const sections = [
        introSection,
        definitionSection,
        complexitySection,
        applicationsSection,
    ];

    return (
        <Overlay backgroundColor={Theme.HEADER_COLOR}>
            <Sections sections={sections} />
        </Overlay>
    );
}

export default TspPage;

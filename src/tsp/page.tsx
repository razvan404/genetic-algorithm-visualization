import { Overlay, Sections } from '@/core';

import introSection from './introSection';
import definitionSection from './definitionSection';
import complexitySection from './complexitySection';
import applicationsSection from './applicationsSection';

function TspPage() {
    const sections = [
        introSection,
        definitionSection,
        complexitySection,
        applicationsSection,
    ];

    return (
        <Overlay
            theme={{
                backgroundColor: '#FFFED1',
                headerColor: 'rgba(253, 249, 128, 0.4)',
            }}
        >
            <Sections sections={sections} />
        </Overlay>
    );
}

export default TspPage;

import { Overlay, Sections } from '@/core';

import introSection from './introSection';
import pipelineSection from './pipelineSection';
import representationSection from './representationSection';
import fitnessSection from './fitnessSection';

function OverviewPage() {
    const sections = [
        introSection,
        pipelineSection,
        representationSection,
        fitnessSection,
    ];

    return (
        <Overlay
            theme={{
                headerColor: 'rgba(198, 228, 182, 0.8)',
                backgroundColor: '#CEE1C0',
            }}
        >
            <Sections sections={sections} />
        </Overlay>
    );
}

export default OverviewPage;

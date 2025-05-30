import { Overlay, Sections } from '@/core';

import introSection from './introSection';
import selectionSection from './selectionSection';
import crossoverSection from './crossoverSection';
import mutationsSection from './mutationsSection';

function OverviewPage() {
    const sections = [
        introSection,
        selectionSection,
        crossoverSection,
        mutationsSection,
    ];

    return (
        <Overlay
            theme={{
                headerColor: 'rgba(173, 216, 230, 0.8)',
                backgroundColor: '#BCD7E2',
            }}
        >
            <Sections sections={sections} />
        </Overlay>
    );
}

export default OverviewPage;

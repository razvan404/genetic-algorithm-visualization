import { Overlay, Sections } from '@/core';

import introSection from './introSection';

function OverviewPage() {
    const sections = [introSection];

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

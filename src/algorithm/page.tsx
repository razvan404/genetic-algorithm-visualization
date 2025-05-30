import { Overlay, Sections } from '@/core';

import introSection from './introSection';
import hyperparamsSection from './hyperparamsSection';
import visualizationSection from './visualizationSection';

function OverviewPage() {
    const sections = [introSection, hyperparamsSection, visualizationSection];

    return (
        <Overlay
            theme={{
                headerColor: 'rgba(251,191,119, 0.8)',
                backgroundColor: '#ECC693',
            }}
        >
            <Sections sections={sections} />
        </Overlay>
    );
}

export default OverviewPage;

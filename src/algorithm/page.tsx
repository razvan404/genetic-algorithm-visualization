import React from 'react';

import { Overlay, Sections } from '@/core';

import introSection from './introSection';
import hyperparamsSection, {
    type Hyperparams,
    HyperparamContext,
    defaultParams,
} from './hyperparamsSection';
import visualizationSection from './visualizationSection';

function AlgorithmPage() {
    const [hyperparams, setHyperparams] =
        React.useState<Hyperparams>(defaultParams);
    const sections = [introSection, hyperparamsSection, visualizationSection];

    return (
        <Overlay
            theme={{
                headerColor: 'rgba(251,191,119, 0.8)',
                backgroundColor: '#ECC693',
            }}
        >
            <HyperparamContext.Provider value={{ hyperparams, setHyperparams }}>
                <Sections sections={sections} />
            </HyperparamContext.Provider>
        </Overlay>
    );
}

export default AlgorithmPage;

import React from 'react';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';
import { TSPVisualizer } from './visualizer';
import { HyperparamContext } from './hyperparamsSection';

function VisualizationSection() {
    const { hyperparams } = React.useContext(HyperparamContext);
    const [playing, setPlaying] = React.useState<boolean | null>(null);
    const [finished, setFinished] = React.useState<boolean>(false);

    React.useEffect(() => {
        // Reset playing and finished state when hyperparams change
        setPlaying(null);
        setFinished(false);
    }, [hyperparams]);

    const description = React.useMemo(() => {
        let buttonText = 'Start simulation';
        if (finished) {
            buttonText = 'Restart simulation';
        } else if (playing === true) {
            buttonText = 'Stop simulation';
        } else if (playing === false) {
            buttonText = 'Continue simulation';
        }
        return (
            <>
                <button
                    onClick={() => {
                        if (finished) {
                            setFinished(false);
                            setPlaying(true);
                            return;
                        }
                        setPlaying((prev) => !prev);
                    }}
                >
                    {buttonText}
                </button>
            </>
        );
    }, [playing, finished]);

    const figure = React.useMemo(() => {
        return (
            <>
                {playing === null && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            zIndex: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <h2>Simulation not started</h2>
                    </div>
                )}
                <TSPVisualizer
                    populationSize={hyperparams.populationSize}
                    mutationRate={hyperparams.mutationRate}
                    crossoverRate={hyperparams.crossoverRate}
                    elitismCount={hyperparams.elitismCount}
                    maxGenerations={hyperparams.maxGenerations}
                    playing={playing ?? false}
                    setPlaying={setPlaying}
                    finished={finished}
                    setFinished={setFinished}
                />
            </>
        );
    }, [playing, finished, hyperparams]);

    return (
        <InfoSection
            title={getTitle(Sections.VISUALIZATION)}
            description={description}
            figure={figure}
            nextSectionText={'Thank you for reading!'}
        />
    );
}

export default {
    id: Sections.VISUALIZATION,
    component: <VisualizationSection />,
};

import React from 'react';

// @ts-expect-error - TSPVisualizerRaw is a raw JSX component.
import TSPVisualizerRaw from './visualizer';

const TSPVisualizer = TSPVisualizerRaw as React.FC<{
    populationSize?: number;
    mutationRate?: number;
    crossoverRate?: number;
    elitismCount?: number;
    maxGenerations?: number;
    playing?: boolean;
    setPlaying?: (playing: boolean) => void;
    finished?: boolean;
    setFinished?: (finished: boolean) => void;
}>;

export { TSPVisualizer };

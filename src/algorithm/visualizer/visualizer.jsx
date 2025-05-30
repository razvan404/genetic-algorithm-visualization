import React from 'react';
import { path2edgesList, mean, min, max } from './utils';
import TSPGeneticAlgorithm from './tsp';
import './graph-plot';
import './plot2D';
import './styles.css';

const points = [
    { id: 0, x: 60, y: 200 },
    { id: 1, x: 180, y: 200 },
    { id: 2, x: 80, y: 180 },
    { id: 3, x: 140, y: 180 },
    { id: 4, x: 20, y: 160 },
    { id: 5, x: 100, y: 160 },
    { id: 6, x: 200, y: 160 },
    { id: 7, x: 140, y: 140 },
    { id: 8, x: 40, y: 120 },
    { id: 9, x: 100, y: 120 },
];

function TSPVisualizer({
    populationSize = 100,
    mutationRate = 0.02,
    crossoverRate = 0.7,
    elitismCount = 2,
    maxGenerations = 500,
    playing = false,
    setPlaying = () => {},
    finished = false,
    setFinished = () => {},
}) {
    const bestPlotRef = React.useRef(null);
    const fitnessPlotRef = React.useRef(null);
    const populationContainerRef = React.useRef(null);
    const ga = React.useRef(null);

    React.useEffect(() => {
        if (finished) {
            return;
        }
        const sampleGraphPlots = [];
        const populationCount = 6;

        if (populationContainerRef.current) {
            populationContainerRef.current.innerHTML = '';
            for (let i = 0; i < populationCount; i++) {
                const plot = document.createElement('graph-plot');
                populationContainerRef.current.appendChild(plot);
                sampleGraphPlots.push(plot);
            }
        }

        for (const plot of sampleGraphPlots) {
            plot.points = points;
        }

        if (bestPlotRef.current) {
            bestPlotRef.current.points = points;
        }

        const fitnessAvg = [];
        const fitnessMax = [];
        const fitnessMin = [];

        ga.current = new TSPGeneticAlgorithm(points, {
            populationSize,
            mutationRate,
            crossoverRate,
            elitismCount,

            onBestSolution: (bestPath, distance) => {
                console.log(
                    'New best solution:',
                    bestPath,
                    'Distance:',
                    distance.toFixed(2),
                );
                bestPlotRef.current.edgeSets = [path2edgesList(bestPath)];
            },

            onPopulationChanged: (population) => {
                for (let i = 0; i < sampleGraphPlots.length; i++) {
                    sampleGraphPlots[i].edgeSets = [
                        path2edgesList(population[i]),
                    ];
                }
            },

            onFitnessChanged: (fitnessArray) => {
                const plot = fitnessPlotRef.current;
                plot.clear();

                fitnessAvg.push(mean(fitnessArray));
                fitnessMax.push(max(fitnessArray));
                fitnessMin.push(min(fitnessArray));

                const x = Array.from(
                    { length: fitnessAvg.length },
                    (_, i) => i,
                );

                plot.plot(x, fitnessAvg, 'blue', 'avg');
                plot.plot(x, fitnessMin, 'green', 'min');
                plot.plot(x, fitnessMax, 'red', 'max');
                plot.show();
            },
        });
        return () => {
          fitnessPlotRef.current?.clear();
          if (ga.current) {
              ga.current.stop();
              ga.current = null;
          }
        }
    }, [populationSize, mutationRate, crossoverRate, elitismCount, finished]);

    React.useEffect(() => {
        if (!ga.current) {
            return;
        }
        if (!playing) {
            ga.current.stop();
            return;
        }
        ga.current.run({
            maxGenerations,
            callbackPerGeneration: (gen, _, distance) => {
                console.log(
                    `Generation ${gen} best distance: ${distance.toFixed(2)}`,
                );
            },
            callbackEnd: () => {
                setPlaying(false);
                setFinished(true);
            },
        });
    }, [maxGenerations, playing]);

    return (
        <div id="container">
            <div id="best-solution">
                <h2 style={{ display: 'flex' }}>Best solution</h2>
                <graph-plot
                    ref={bestPlotRef}
                    style={{ width: '100%', height: '50%' }}
                />
                <h3 style={{ display: 'flex' }}>Fitness evolution</h3>
                <plot-2d
                    ref={fitnessPlotRef}
                    style={{
                        width: '70%',
                        height: '30%',
                        border: '1px solid black',
                    }}
                />
            </div>
            <div id="population-preview" ref={populationContainerRef} />
        </div>
    );
}

export default TSPVisualizer;

import React from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
    Legend,
} from 'recharts';

import { InfoSection } from '@/core';

import { Sections, getTitle } from './sections';

function generateFitnessData(count = 100, min = 50, max = 150) {
    const data: { id: string; fitness: number }[] = [];
    for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        data.push({ id: `${i}`, fitness: value });
    }
    return data;
}

const fitnessData = generateFitnessData(20, 10, 120);

function SelectionSection() {
    const description = React.useMemo(
        () => (
            <>
                <p>
                    In classical genetic algorithms, <strong>selection</strong>{' '}
                    determines which individuals are chosen to reproduce and
                    pass on their traits to the next generation. Typically,
                    individuals with higher fitness have a greater chance of
                    being selected, simulating the principle of "survival of the
                    fittest." This helps guide the population toward
                    increasingly optimal solutions over successive generations.
                </p>
                <p>Common selection methods include:</p>
                <ul>
                    <li>
                        <strong>Roulette Wheel Selection:</strong> Each
                        individual is assigned a probability proportional to its
                        fitness. Selection is like spinning a wheel weighted by
                        these probabilities.
                    </li>
                    <li>
                        <strong>Tournament Selection:</strong> A random group of
                        individuals competes, and the one with the highest
                        fitness is selected. This can be repeated to fill the
                        next generation.
                    </li>
                    <li>
                        <strong>Rank Selection:</strong> Individuals are ranked
                        by fitness, and selection probabilities are assigned
                        based on rank instead of absolute fitness.
                    </li>
                </ul>
                <p>
                    In the <strong>Traveling Salesman Problem (TSP)</strong>,
                    selection plays a critical role in maintaining path
                    diversity while converging toward shorter tours. Since TSP
                    solutions are represented as permutations of cities,
                    selecting only the best tours too aggressively can cause the
                    population to become similar too early—losing exploration
                    potential.
                </p>
                <p>
                    Therefore, selection in TSP often balances exploration and
                    exploitation. Methods like tournament selection are popular
                    in TSP because they provide control over selective pressure:
                    larger tournaments favor fitter paths, while smaller ones
                    keep more diversity. By carefully tuning this pressure, the
                    algorithm can evolve toward optimal routes while avoiding
                    premature convergence.
                </p>
            </>
        ),
        [],
    );

    const figure = React.useMemo(() => {
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

        return (
            <div style={{ display: 'grid', gap: '2rem' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center',
                    }}
                >
                    <h4>Roulette Wheel Selection (Fitness Proportions)</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={fitnessData}
                                dataKey="fitness"
                                nameKey="id"
                                outerRadius={60}
                                label
                            >
                                {fitnessData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center',
                    }}
                >
                    <h4>Tournament Winners</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            data={fitnessData.filter(
                                (_, index) => index % 5 === 0,
                            )}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="id" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="fitness" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center',
                    }}
                >
                    <h4>Rank Selection</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                            data={[...fitnessData]
                                .sort((a, b) => a.fitness - b.fitness)
                                .reverse()}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="fitness"
                                stroke="#82ca9d"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }, []);

    return (
        <InfoSection
            title={getTitle(Sections.SELECTION)}
            description={description}
            figure={figure}
            nextSectionText={getTitle(Sections.CROSSOVER)}
            nextSectionLink={`#${Sections.CROSSOVER}`}
        />
    );
}

export default {
    id: Sections.SELECTION,
    component: <SelectionSection />,
};

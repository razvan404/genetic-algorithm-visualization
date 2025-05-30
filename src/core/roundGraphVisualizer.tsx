import React from 'react';

import { shuffle, formatScientificNotation, factorialApprox } from '@/utils';

type Node = {
    id: number;
    x: number;
    y: number;
};

type Props = {
    title?: string;
    subtitle?: string;
    nodeCount?: number;
    radius?: number;
    width?: number;
    height?: number;
    animDurationMs?: number | null;
    animFadeMs?: number;
    nodeSize?: number;
    edgeProbability?: number;
    nodeColor?: string;
    edgeColor?: string;
    tspPathColor?: string;
    invalidEdgeColor?: string;
    displayTotalDistance?: boolean;
    displayCitiesCount?: boolean;
    displayFitnessScore?: boolean;
    displayMaxRoutesCount?: boolean;
    displayReloadRoute?: boolean;
    displayReloadRoute50Times?: boolean;
    displayCurrentChromosome?: boolean;
    onTspPathUpdate?: (path: Node[], distance: number, fitness: number) => void;
    className?: string;
};

function RoundGraphVisualizer({
    title,
    subtitle,
    nodeCount = 8,
    radius = 150,
    width = 400,
    height = 400,
    animDurationMs = null,
    animFadeMs = 300,
    nodeSize = 16,
    edgeProbability = 1,
    nodeColor = '#FFCA66',
    edgeColor = 'rgba(120, 120, 120, 0.1)',
    invalidEdgeColor = 'rgba(255, 75, 0, 0.8)',
    tspPathColor = '#FFAE42',
    displayTotalDistance = false,
    displayCitiesCount = false,
    displayFitnessScore = false,
    displayMaxRoutesCount = false,
    displayReloadRoute = false,
    displayCurrentChromosome = false,
    displayReloadRoute50Times = false,
    onTspPathUpdate,
    className,
}: Props) {
    const centerX = width / 2;
    const centerY = height / 2;
    const angleStep = (2 * Math.PI) / nodeCount;

    const nodes: Node[] = React.useMemo(
        () =>
            Array.from({ length: nodeCount }, (_, i) => ({
                id: i + 1,
                x: centerX + radius * Math.cos(i * angleStep),
                y: centerY + radius * Math.sin(i * angleStep),
            })),
        [angleStep, centerX, centerY, nodeCount, radius],
    );

    const edges = React.useMemo(() => {
        const edgesList: [number, number][] = [];
        for (let i = 0; i < nodeCount; i++) {
            for (let j = 0; j < nodeCount; j++) {
                if (i !== j && Math.random() < edgeProbability) {
                    edgesList.push([i, j]);
                }
            }
        }
        return edgesList;
    }, [nodeCount, edgeProbability]);

    const [tspPath, setTspPath] = React.useState<Node[]>([]);
    const [opacity, setOpacity] = React.useState(0);

    const updateRoute = React.useCallback(
        (duration?: number) => {
            const ids = Array.from({ length: nodes.length }, (_, i) => i);
            setTspPath(shuffle(ids).map((i) => nodes[i]));
            setOpacity(1);

            let timeout: ReturnType<typeof setTimeout> | null = null;
            if (duration) {
                timeout = setTimeout(
                    () => setOpacity(0),
                    duration - animFadeMs,
                );
            }
            return timeout;
        },
        [nodes, animFadeMs],
    );

    React.useEffect(() => {
        if (!animDurationMs) {
            updateRoute();
            return;
        }
        let timeout = updateRoute(animDurationMs);
        const interval = setInterval(() => {
            timeout = updateRoute(animDurationMs);
        }, animDurationMs);

        return () => {
            clearInterval(interval);
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [updateRoute, animDurationMs]);

    const totalDistance = React.useMemo(() => {
        if (tspPath.length < 2) return 0;
        let distance = 0;
        for (let i = 0; i < tspPath.length; i++) {
            const from = tspPath[i];
            const to = tspPath[(i + 1) % tspPath.length]; // loop back
            distance += Math.hypot(to.x - from.x, to.y - from.y);
        }
        return distance;
    }, [tspPath]);

    const fitness = React.useMemo(() => {
        if (tspPath.length < 2) {
            return { score: 0, invalidEdges: 0 };
        }
        let distance = 0,
            invalidEdges = 0;
        for (let i = 0; i < tspPath.length; i++) {
            const from = tspPath[i];
            const to = tspPath[(i + 1) % tspPath.length];
            if (
                !edges.some(
                    ([edgeFrom, edgeTo]) =>
                        edgeFrom === from.id - 1 && edgeTo === to.id - 1,
                )
            ) {
                distance += 10000;
                invalidEdges += 1;
            } else {
                distance += Math.hypot(to.x - from.x, to.y - from.y);
            }
        }
        return { score: 1e5 / distance, invalidEdges };
    }, [tspPath, edges]);

    React.useEffect(() => {
        onTspPathUpdate?.(tspPath, totalDistance, fitness.score);
    }, [tspPath, totalDistance, fitness, onTspPathUpdate]);

    return (
        <div
            className={className}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {title && (
                <h3 style={{ marginTop: 0, marginBottom: 5 }}>{title}</h3>
            )}
            {subtitle && (
                <p style={{ marginTop: 0, marginBottom: 5 }}>
                    <em>{subtitle}</em>
                </p>
            )}
            <svg width={width} height={height}>
                {/* Arrowhead definition */}
                <defs>
                    <marker
                        id="completeArrowHead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="10"
                        refY="3.5"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill={edgeColor} />
                    </marker>
                </defs>
                {/* Directed edges */}
                {edges.map(([edgeFrom, edgeTo], i) => {
                    const from = nodes[edgeFrom];
                    const to = nodes[edgeTo];

                    // Slightly shorten the line to avoid overlapping the node circle
                    const dx = to.x - from.x;
                    const dy = to.y - from.y;
                    const len = Math.sqrt(dx * dx + dy * dy);
                    const ux = dx / len;
                    const uy = dy / len;

                    const x1 = from.x;
                    const y1 = from.y;
                    const x2 = to.x - ux * nodeSize;
                    const y2 = to.y - uy * nodeSize;

                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={edgeColor}
                            strokeWidth={1}
                            markerEnd="url(#completeArrowHead)"
                        />
                    );
                })}
                {/* TSP route as directed lines with arrows */}
                {tspPath.length > 1 && (
                    <>
                        <defs>
                            <marker
                                id="tspValidArrow"
                                markerWidth="10"
                                markerHeight="7"
                                refX="10"
                                refY="3.5"
                                orient="auto"
                                markerUnits="strokeWidth"
                            >
                                <polygon
                                    points="0 0, 10 3.5, 0 7"
                                    fill={tspPathColor}
                                />
                            </marker>
                        </defs>
                        <defs>
                            <marker
                                id="tspInvalidArrow"
                                markerWidth="10"
                                markerHeight="7"
                                refX="10"
                                refY="3.5"
                                orient="auto"
                                markerUnits="strokeWidth"
                            >
                                <polygon
                                    points="0 0, 10 3.5, 0 7"
                                    fill={invalidEdgeColor}
                                />
                            </marker>
                        </defs>
                        {tspPath.map((from, i) => {
                            const to = tspPath[(i + 1) % tspPath.length]; // loop path
                            const dx = to.x - from.x;
                            const dy = to.y - from.y;
                            const len = Math.sqrt(dx * dx + dy * dy);
                            const ux = dx / len;
                            const uy = dy / len;

                            const x1 = from.x;
                            const y1 = from.y;
                            const x2 = to.x - ux * nodeSize;
                            const y2 = to.y - uy * nodeSize;

                            const isEdgeValid = edges.some(
                                ([edgeFrom, edgeTo]) =>
                                    edgeFrom === from.id - 1 &&
                                    edgeTo === to.id - 1,
                            );

                            return (
                                <line
                                    key={`tsp-${i}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={
                                        isEdgeValid
                                            ? tspPathColor
                                            : invalidEdgeColor
                                    }
                                    strokeWidth={isEdgeValid ? '0.5%' : '0.3%'}
                                    markerEnd={
                                        isEdgeValid
                                            ? 'url(#tspValidArrow)'
                                            : 'url(#tspInvalidArrow)'
                                    }
                                    style={{
                                        opacity,
                                        transition: `opacity ${animFadeMs}ms ease-in-out`,
                                    }}
                                />
                            );
                        })}
                    </>
                )}
                {/* Nodes */}
                {nodes.map((node) => (
                    <g key={node.id}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={nodeSize}
                            fill={nodeColor}
                            stroke="black"
                            strokeWidth={2}
                        />
                        <text
                            x={node.x}
                            y={node.y + nodeSize / 3}
                            textAnchor="middle"
                            fontSize={`${nodeSize}px`}
                            fill="black"
                            fontWeight="bold"
                        >
                            {node.id}
                        </text>
                    </g>
                ))}
            </svg>
            {displayTotalDistance && (
                <p
                    style={{
                        textAlign: 'center',
                        marginTop: 0,
                        marginBottom: 5,
                    }}
                >
                    Total distance: <strong>{totalDistance.toFixed(2)}</strong>{' '}
                    units.
                </p>
            )}
            {displayFitnessScore && (
                <p
                    style={{
                        textAlign: 'center',
                        marginTop: 0,
                        marginBottom: 5,
                    }}
                >
                    Fitness score:{' '}
                    <strong>
                        {fitness.score.toFixed(4)} (invalid edges:{' '}
                        {fitness.invalidEdges})
                    </strong>
                    .
                </p>
            )}
            {displayCitiesCount && (
                <p
                    style={{
                        textAlign: 'center',
                        marginTop: 0,
                        marginBottom: 5,
                    }}
                >
                    Cities count: <strong>{nodeCount}</strong>.
                </p>
            )}
            {displayMaxRoutesCount && (
                <p
                    style={{
                        textAlign: 'center',
                        marginTop: 0,
                        marginBottom: 5,
                    }}
                >
                    Max routes count:{' '}
                    <strong>
                        {formatScientificNotation(factorialApprox(nodeCount), {
                            forceString: true,
                        })}
                    </strong>
                    .
                </p>
            )}
            {displayCurrentChromosome && tspPath.length > 0 && (
                <div
                    style={{
                        display: 'flex',
                        gap: '6px',
                        marginTop: 0,
                        marginBottom: 5,
                    }}
                >
                    {tspPath.map((node, i) => (
                        <div
                            key={i}
                            style={{
                                width: 30,
                                height: 30,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#fff',
                                border: '2px solid #444',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                color: '#333',
                            }}
                            title={`Position ${i + 1}`}
                        >
                            {node.id}
                        </div>
                    ))}
                </div>
            )}
            {displayReloadRoute && (
                <button
                    style={{
                        width: width / 2,
                        marginTop: 10,
                        marginBottom: 5,
                        border: '#ccc 1px solid',
                    }}
                    onClick={() => updateRoute()}
                >
                    Reload route 1 time
                </button>
            )}
            {displayReloadRoute50Times && (
                <button
                    style={{
                        width: width / 2,
                        marginTop: 10,
                        marginBottom: 5,
                        border: '#ccc 1px solid',
                    }}
                    onClick={() => {
                        let idx = 0;
                        const interval = setInterval(() => {
                            if (idx <= 49) {
                                updateRoute(animFadeMs * 2);
                                idx += 1;
                                return;
                            }
                            updateRoute();
                            clearInterval(interval);
                        }, animFadeMs * 2);
                    }}
                >
                    Reload route 50 times
                </button>
            )}
        </div>
    );
}

export default RoundGraphVisualizer;

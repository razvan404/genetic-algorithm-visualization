import React from 'react';

import { shuffle } from '@/utils';
import { formatScientificNotation, factorialApprox } from '@/utils';

type Node = {
    id: number;
    x: number;
    y: number;
};

type Props = {
    nodeCount?: number;
    radius?: number;
    width?: number;
    height?: number;
    animDurationMs?: number;
    nodeSize?: number;
    nodeColor?: string;
    edgeColor?: string;
    tspPathColor?: string;
    displayTotalDistance?: boolean;
    displayCitiesCount?: boolean;
    displayMaxRoutesCount?: boolean;
    className?: string;
};

function CompleteGraphVisualizer({
    nodeCount = 8,
    radius = 150,
    width = 400,
    height = 400,
    animDurationMs = 4000,
    nodeSize = 16,
    nodeColor = '#ffca66',
    edgeColor = 'rgba(120, 120, 120, 0.2)',
    tspPathColor = '#ff691e',
    displayTotalDistance = false,
    displayCitiesCount = false,
    displayMaxRoutesCount = false,
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
                if (i !== j) {
                    edgesList.push([i, j]);
                }
            }
        }
        return edgesList;
    }, [nodeCount]);

    const [tspPath, setTspPath] = React.useState<Node[]>([]);
    const [opacity, setOpacity] = React.useState(0);

    React.useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const updateRoute = () => {
            const ids = Array.from({ length: nodes.length }, (_, i) => i);
            setTspPath(shuffle(ids).map((i) => nodes[i]));
            setOpacity(1);
            timeout = setTimeout(() => setOpacity(0), animDurationMs - 500);
        };

        updateRoute();
        const interval = setInterval(updateRoute, animDurationMs);
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [nodes, animDurationMs]);

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

    const distanceTextY = displayTotalDistance ? height - 10 : height - 30;
    const citiesCountTextY = displayCitiesCount
        ? distanceTextY + 20
        : distanceTextY;
    const maxRoutesCountTextY = displayMaxRoutesCount
        ? citiesCountTextY + 20
        : citiesCountTextY;
    const heightAddon = [displayTotalDistance, displayCitiesCount, displayMaxRoutesCount].filter(Boolean).length * 20;

    return (
        <svg width={width} height={height + heightAddon} className={className}>
            {/* Arrowhead definition */}
            <defs>
                <marker
                    id="arrowhead"
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
                        markerEnd="url(#arrowhead)"
                    />
                );
            })}
            {/* TSP route as directed lines with arrows */}
            {tspPath.length > 1 && (
                <>
                    <defs>
                        <marker
                            id="tspArrow"
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

                        return (
                            <line
                                key={`tsp-${i}`}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={tspPathColor}
                                strokeWidth={2}
                                markerEnd="url(#tspArrow)"
                                style={{
                                    opacity,
                                    transition: 'opacity 0.5s ease-in-out',
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
            {displayTotalDistance && (
                <text
                    x={width / 2}
                    y={distanceTextY}
                    textAnchor="middle"
                    fontSize="16px"
                    fill="#333"
                >
                    <tspan>Total Distance: </tspan>
                    <tspan fontWeight="bold">{totalDistance.toFixed(1)}</tspan>
                </text>
            )}
            {displayCitiesCount && (
                <text
                    x={width / 2}
                    y={citiesCountTextY}
                    textAnchor="middle"
                    fontSize="16px"
                    fill="#333"
                >
                    <tspan>Cities Count: </tspan>
                    <tspan fontWeight="bold">{nodeCount}</tspan>
                </text>
            )}
            {displayMaxRoutesCount && (
                <text
                    x={width / 2}
                    y={maxRoutesCountTextY}
                    textAnchor="middle"
                    fontSize="16px"
                    fill="#333"
                >
                    <tspan>Max Routes Count: </tspan>
                    <tspan fontWeight="bold">
                        {formatScientificNotation(factorialApprox(nodeCount), { forceString: true })}
                    </tspan>
                </text>
            )}
        </svg>
    );
}

export default CompleteGraphVisualizer;

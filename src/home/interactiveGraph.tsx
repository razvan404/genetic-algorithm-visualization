import React from 'react';

type Props = {
    nodeCount?: number;
    canvasPadding?: number;
    maxDistance?: number;
    minIntensity?: number;
    maxIntensity?: number;
    edgeColor?: (intensity: number) => string;
    nodeColor?: string;
    className?: string;
};

function ProximityGraph({
    nodeCount = 20,
    canvasPadding = 80,
    maxDistance = 400,
    minIntensity = 128,
    maxIntensity = 255,
    edgeColor = (intensity: number) =>
        `rgb(${intensity}, ${intensity}, ${intensity})`,
    nodeColor = '#888',
    className,
}: Props) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);

        const mouse = { x: 0, y: 0 };
        const onMouseMove = (ev: MouseEvent) => {
            mouse.x = ev.clientX;
            mouse.y = ev.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        const nodes: {
            x: number;
            y: number;
            angle: number;
            radius: number;
            speed: number;
        }[] = [];
        for (let i = 0; i < nodeCount; i++) {
            const angle = Math.random() * 2 * Math.PI;
            nodes.push({
                x:
                    canvasPadding +
                    Math.random() * (canvas.width - 2 * canvasPadding),
                y:
                    canvasPadding +
                    Math.random() * (canvas.height - 2 * canvasPadding),
                angle,
                radius: 0.5 + Math.random(),
                speed: 0.01 + Math.random() * 0.01,
            });
        }

        const edges: [number, number][] = [];
        const nodeEdges = Array.from(
            { length: nodeCount },
            () => [] as number[],
        );
        for (let i = 0; i < nodeCount; i++) {
            while (nodeEdges[i].length < 2) {
                const j = Math.floor(Math.random() * nodeCount);
                if (
                    j !== i &&
                    !nodeEdges[i].includes(j) &&
                    nodeEdges[j].length < 3
                ) {
                    nodeEdges[i].push(j);
                    nodeEdges[j].push(i);
                    edges.push([i, j]);
                }
            }
        }

        const pointToSegmentDistance = (
            px: number,
            py: number,
            x1: number,
            y1: number,
            x2: number,
            y2: number,
        ) => {
            const A = px - x1;
            const B = py - y1;
            const C = x2 - x1;
            const D = y2 - y1;

            const dot = A * C + B * D;
            const lenSq = C * C + D * D;
            let param = -1;
            if (lenSq !== 0) param = dot / lenSq;

            let xx, yy;
            if (param < 0) {
                xx = x1;
                yy = y1;
            } else if (param > 1) {
                xx = x2;
                yy = y2;
            } else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }

            const dx = px - xx;
            const dy = py - yy;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const updateNodes = () => {
            for (const node of nodes) {
                node.angle += node.speed;
                node.x += Math.cos(node.angle) * node.radius;
                node.y += Math.sin(node.angle) * node.radius;

                if (
                    node.x < canvasPadding ||
                    node.x > canvas.width - canvasPadding
                )
                    node.angle = Math.PI - node.angle;
                if (
                    node.y < canvasPadding ||
                    node.y > canvas.height - canvasPadding
                )
                    node.angle = -node.angle;
            }
        };

        const drawEdges = () => {
            edges.forEach(([a, b]) => {
                const nodeA = nodes[a];
                const nodeB = nodes[b];
                const dist = pointToSegmentDistance(
                    mouse.x,
                    mouse.y,
                    nodeA.x,
                    nodeA.y,
                    nodeB.x,
                    nodeB.y,
                );
                const intensity = Math.max(
                    minIntensity,
                    maxIntensity -
                        (dist / maxDistance) * (maxIntensity - minIntensity),
                );

                ctx.strokeStyle = edgeColor(intensity);
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(nodeA.x, nodeA.y);
                ctx.lineTo(nodeB.x, nodeB.y);
                ctx.stroke();
            });
        };

        const drawNodes = () => {
            ctx.fillStyle = nodeColor;
            nodes.forEach((node) => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateNodes();
            drawEdges();
            drawNodes();
            requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [
        nodeCount,
        canvasPadding,
        maxDistance,
        minIntensity,
        maxIntensity,
        edgeColor,
        nodeColor,
    ]);

    return <canvas className={className} ref={canvasRef} />;
}

export default ProximityGraph;

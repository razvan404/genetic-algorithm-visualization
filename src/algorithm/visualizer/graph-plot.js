function random(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;

    return function () {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
    };
}

class GraphPlot extends HTMLElement {
    /*static get observedAttributes() {
    return ['points', 'edge-sets']; // Watch this attribute for changes
  }*/

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        .plot-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="plot-container"></div>
    `;

        this.container = this.shadowRoot.querySelector('.plot-container');

        this.container.style.position = 'relative';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.shadowRoot.appendChild(this.container);

        this._points = [];
        this._edgeSets = [];

        this.resizeObserver = new ResizeObserver(() => {
            this.render();
        });
    }

    get points() {
        return this._points;
    }

    set points(value) {
        this._points = value;
        this.render();
    }

    get edgeSets() {
        return this._edgeSets;
    }

    set edgeSets(value) {
        this._edgeSets = value;
        this.render();
    }

    connectedCallback() {
        this.resizeObserver.observe(this);
        this.render();
    }

    disconnectedCallback() {
        this.resizeObserver.unobserve(this);
    }

    /*attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'points' && oldValue !== newValue) {
      this.render();
    }
    if (name === 'edgeSets' && oldValue !== newValue) {
      this.render();
    }
  }*/

    parsePoints() {
        const rawPoints = this.points;

        const { minX, maxX, minY, maxY } = rawPoints.reduce(
            (acc, { x, y }) => ({
                minX: Math.min(acc.minX, x),
                maxX: Math.max(acc.maxX, x),
                minY: Math.min(acc.minY, y),
                maxY: Math.max(acc.maxY, y),
            }),
            {
                minX: rawPoints[0]?.x ?? 0,
                maxX: rawPoints[0]?.x ?? 0,
                minY: rawPoints[0]?.y ?? 0,
                maxY: rawPoints[0]?.y ?? 0,
            },
        );

        const borderSize = 20;

        const scaleX =
            maxX - minX < 0.1
                ? 1
                : (this.clientWidth - 2 * borderSize) / (maxX - minX);
        const translateX = -minX * scaleX + borderSize;

        const scaleY =
            maxY - minY < 0.1
                ? 1
                : (this.clientHeight - 2 * borderSize) / (maxY - minY);
        const translateY = -minY * scaleY + borderSize;

        const points = rawPoints.map(({ x, y, id }) => {
            return {
                x: scaleX * x + translateX,
                y: scaleY * y + translateY,
                id: id,
            };
        });
        return points;
    }

    render() {
        const pointRadius = 20;

        this.container.innerHTML = ''; // Clear previous points
        const points = this.parsePoints();

        const id2Coord = Object.fromEntries(
            points.map((p) => [p.id, { x: p.x, y: p.y }]),
        );

        const edgeSets = this.edgeSets;
        const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg',
        );

        svg.setAttribute(
            'viewBox',
            `0 0 ${this.clientWidth} ${this.clientHeight}`,
        );

        svg.style.position = 'relative';
        svg.style.display = 'block';
        svg.style.width = `${this.clientWidth}px`;
        svg.style.height = `${this.clientHeight}px`;

        this.container.appendChild(svg);

        requestAnimationFrame((t) => {});

        function drawSVGLine(svg, x1, y1, x2, y2, color = 'black') {
            const line = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'line',
            );
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', color);
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);
        }

        const rand = random(2025);

        for (const edgeList of edgeSets) {
            const color = `rgba(${Math.floor(rand() * 255)}, ${Math.floor(rand() * 255)}, ${Math.floor(rand() * 255)}, 0.7)`;
            for (const [fromId, toId] of edgeList) {
                const fromPos = id2Coord[fromId];
                const toPos = id2Coord[toId];
                drawSVGLine(
                    svg,
                    fromPos['x'],
                    fromPos['y'],
                    toPos['x'],
                    toPos['y'],
                    color,
                );
            }
        }

        for (const { x, y, id } of points) {
            const point = document.createElement('div');
            point.style.position = 'absolute';
            point.style.width = `${pointRadius}px`;
            point.style.height = `${pointRadius}px`;
            point.style.borderRadius = '50%';
            point.style.backgroundColor = 'red';
            point.style.left = `${x - pointRadius / 2}px`;
            point.style.top = `${y - pointRadius / 2}px`;
            point.style.display = 'flex';
            point.style.alignItems = 'center';
            point.style.justifyContent = 'center';

            const label = document.createElement('span');
            label.style.position = 'relative';
            label.style.color = 'white';
            label.style.fontSize = '10px';

            label.innerHTML = `${id}`;

            point.appendChild(label);

            this.container.appendChild(point);
        }
    }
}

customElements.define('graph-plot', GraphPlot);

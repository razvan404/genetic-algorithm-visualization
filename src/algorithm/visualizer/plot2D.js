class Plot2D extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.shadowRoot.appendChild(this.canvas);
        this.plots = [];
        this.margin = { top: 20, right: 120, bottom: 40, left: 50 };
        this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    }

    connectedCallback() {
        this.resizeCanvas();
        this.resizeObserver.observe(this);
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
    }

    resizeCanvas() {
        const width = this.clientWidth;
        const height = this.clientHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        if (this.isConnected) this.show();
    }

    plot(x, y, color = 'blue', label = 'Plot') {
        this.plots.push({ x, y, color, label });
    }

    _niceTicks(min, max, ticks = 5) {
        const range = max - min;
        const roughStep = range / ticks;
        const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
        const niceSteps = [1, 2, 5, 10];
        let step =
            niceSteps.find((s) => s * magnitude >= roughStep) * magnitude;

        const start = Math.ceil(min / step) * step;
        const end = Math.floor(max / step) * step;

        const values = [];
        for (let v = start; v <= end + step / 2; v += step) {
            values.push(v);
        }
        return values;
    }

    clear() {
        this.plots = [];
    }

    show() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const allX = this.plots.flatMap((p) => p.x);
        const allY = this.plots.flatMap((p) => p.y);
        const minX = Math.min(...allX),
            maxX = Math.max(...allX);
        const minY = Math.min(...allY),
            maxY = Math.max(...allY);

        const plotWidth =
            this.canvas.width - this.margin.left - this.margin.right;
        const plotHeight =
            this.canvas.height - this.margin.top - this.margin.bottom;

        const scaleX = plotWidth / (maxX - minX || 1);
        const scaleY = plotHeight / (maxY - minY || 1);

        // Axes
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.margin.left, this.margin.top);
        ctx.lineTo(this.margin.left, this.canvas.height - this.margin.bottom);
        ctx.lineTo(
            this.canvas.width - this.margin.right,
            this.canvas.height - this.margin.bottom,
        );
        ctx.stroke();

        // Adaptive ticks
        const xTicks = this._niceTicks(minX, maxX);
        const yTicks = this._niceTicks(minY, maxY);
        const formatter = new Intl.NumberFormat(undefined, {
            maximumSignificantDigits: 6,
        });

        ctx.font = '10px sans-serif';
        ctx.fillStyle = 'black';

        for (const xVal of xTicks) {
            const xPx = this.margin.left + (xVal - minX) * scaleX;
            ctx.beginPath();
            ctx.moveTo(xPx, this.canvas.height - this.margin.bottom);
            ctx.lineTo(xPx, this.canvas.height - this.margin.bottom + 5);
            ctx.stroke();
            ctx.fillText(
                formatter.format(xVal),
                xPx - 10,
                this.canvas.height - this.margin.bottom + 15,
            );
        }

        for (const yVal of yTicks) {
            const yPx =
                this.canvas.height -
                this.margin.bottom -
                (yVal - minY) * scaleY;
            ctx.beginPath();
            ctx.moveTo(this.margin.left - 5, yPx);
            ctx.lineTo(this.margin.left, yPx);
            ctx.stroke();
            ctx.fillText(
                formatter.format(yVal),
                this.margin.left - 45,
                yPx + 3,
            );
        }

        // Plots
        for (const { x, y, color } of this.plots) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            for (let i = 0; i < x.length; i++) {
                const px = this.margin.left + (x[i] - minX) * scaleX;
                const py =
                    this.canvas.height -
                    this.margin.bottom -
                    (y[i] - minY) * scaleY;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }

        // Legend
        let legendX = this.canvas.width - this.margin.right + 10;
        let legendY = this.margin.top;
        for (const { color, label } of this.plots) {
            ctx.fillStyle = color;
            ctx.fillRect(legendX, legendY, 10, 10);
            ctx.fillStyle = 'black';
            ctx.fillText(label, legendX + 15, legendY + 9);
            legendY += 18;
        }
    }
}

customElements.define('plot-2d', Plot2D);

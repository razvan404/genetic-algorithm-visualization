type TSPPoint = {
    x: number;
    y: number;
    id: string;
};

type TSPCallbacks = {
    populationSize?: number;
    mutationRate?: number;
    crossoverRate?: number;
    elitismCount?: number;
    maxGenerations?: number;
    onBestSolution?: (best: string[], distance: number) => void;
    onPopulationChanged?: (population: string[][]) => void;
    onFitnessChanged?: (fitness: number[]) => void;
};

class TSPGeneticAlgorithm {
    private points: TSPPoint[];
    private populationSize: number;
    private mutationRate: number;
    private crossoverRate: number;
    private elitismCount: number;
    private maxGenerations: number;
    private onBestSolution: (best: string[], distance: number) => void;
    private onPopulationChanged: (population: string[][]) => void;
    private onFitnessChanged: (fitness: number[]) => void;

    private distanceMatrix: number[][];
    private population: string[][];
    private fitness: number[];
    private bestSolution: string[] | null;
    private bestFitness: number;
    private generation: number;

    constructor(points: TSPPoint[], config: TSPCallbacks = {}) {
        this.points = points;
        this.populationSize = config.populationSize ?? 100;
        this.mutationRate = config.mutationRate ?? 0.02;
        this.crossoverRate = config.crossoverRate ?? 0.7;
        this.elitismCount = config.elitismCount ?? 1;
        this.maxGenerations = config.maxGenerations ?? 1000;
        this.onBestSolution = config.onBestSolution ?? (() => {});
        this.onPopulationChanged = config.onPopulationChanged ?? (() => {});
        this.onFitnessChanged = config.onFitnessChanged ?? (() => {});

        this.distanceMatrix = this._computeDistanceMatrix(points);
        this.population = [];
        this.fitness = [];
        this.bestSolution = null;
        this.bestFitness = -Infinity;
        this.generation = 0;
    }

    private _computeDistanceMatrix(points: TSPPoint[]): number[][] {
        const n = points.length;
        const dist = Array.from({ length: n }, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                dist[i][j] = d;
                dist[j][i] = d;
            }
        }
        return dist;
    }

    private _distanceBetweenPoints(id1: string, id2: string): number {
        const idx1 = this.points.findIndex((p) => p.id === id1);
        const idx2 = this.points.findIndex((p) => p.id === id2);
        return this.distanceMatrix[idx1][idx2];
    }

    private _calculatePathDistance(path: string[]): number {
        let dist = 0;
        for (let i = 0; i < path.length - 1; i++) {
            dist += this._distanceBetweenPoints(path[i], path[i + 1]);
        }
        dist += this._distanceBetweenPoints(path[path.length - 1], path[0]);
        return dist;
    }

    private _calculateFitness(path: string[]): number {
        const dist = this._calculatePathDistance(path);
        return 1 / dist;
    }

    private _createRandomIndividual(): string[] {
        const ids = this.points.map((p) => p.id);
        for (let i = ids.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ids[i], ids[j]] = [ids[j], ids[i]];
        }
        return ids;
    }

    private _initialPopulation(): void {
        this.population = [];
        for (let i = 0; i < this.populationSize; i++) {
            this.population.push(this._createRandomIndividual());
        }
    }

    private _evaluatePopulation(): void {
        this.fitness = this.population.map((ind) =>
            this._calculateFitness(ind),
        );
        this.onFitnessChanged(this.fitness);

        const maxFitness = Math.max(...this.fitness);
        if (maxFitness > this.bestFitness) {
            this.bestFitness = maxFitness;
            this.bestSolution =
                this.population[this.fitness.indexOf(maxFitness)];
            this.onBestSolution(this.bestSolution, 1 / this.bestFitness);
        }
    }

    private _selectParent(): string[] {
        const sumFitness = this.fitness.reduce((a, b) => a + b, 0);
        let rand = Math.random() * sumFitness;
        for (let i = 0; i < this.populationSize; i++) {
            rand -= this.fitness[i];
            if (rand <= 0) return this.population[i];
        }
        return this.population[this.populationSize - 1];
    }

    private _crossover(parent1: string[], parent2: string[]): string[] {
        if (Math.random() > this.crossoverRate) return [...parent1];

        const size = parent1.length;
        const child = Array<string>(size).fill('');

        const start = Math.floor(Math.random() * size);
        const end = Math.floor(Math.random() * size);
        const lower = Math.min(start, end);
        const upper = Math.max(start, end);

        for (let i = lower; i <= upper; i++) child[i] = parent1[i];

        let currentPos = (upper + 1) % size;
        for (let i = 0; i < size; i++) {
            const candidate = parent2[(upper + 1 + i) % size];
            if (!child.includes(candidate)) {
                child[currentPos] = candidate;
                currentPos = (currentPos + 1) % size;
            }
        }
        return child;
    }

    private _mutate(individual: string[]): void {
        for (let i = 0; i < individual.length; i++) {
            if (Math.random() < this.mutationRate) {
                const j = Math.floor(Math.random() * individual.length);
                [individual[i], individual[j]] = [individual[j], individual[i]];
            }
        }
    }

    private _createNewPopulation(): void {
        const newPopulation: string[][] = [];

        const sortedIndices = this.fitness
            .map((f, idx) => [f, idx])
            .sort((a, b) => b[0] - a[0])
            .map(([, idx]) => idx);

        for (let i = 0; i < this.elitismCount; i++) {
            newPopulation.push([...this.population[sortedIndices[i]]]);
        }

        while (newPopulation.length < this.populationSize) {
            const parent1 = this._selectParent();
            const parent2 = this._selectParent();
            const child = this._crossover(parent1, parent2);
            this._mutate(child);
            newPopulation.push(child);
        }

        this.population = newPopulation;
        this.onPopulationChanged(this.population);
    }

    public runStep(): boolean {
        if (this.generation === 0) {
            this._initialPopulation();
            this.onPopulationChanged(this.population);
        }

        this._evaluatePopulation();
        this._createNewPopulation();
        this.generation++;

        return this.generation < this.maxGenerations;
    }

    public run(
        callbackPerGeneration:
            | ((gen: number, best: string[], distance: number) => void)
            | null = null,
    ): void {
        const loop = () => {
            const cont = this.runStep();
            if (callbackPerGeneration && this.bestSolution) {
                callbackPerGeneration(
                    this.generation,
                    this.bestSolution,
                    1 / this.bestFitness,
                );
            }
            if (cont) {
                setTimeout(loop, 0);
            }
        };
        loop();
    }
}

export default TSPGeneticAlgorithm;

export default class TSPGeneticAlgorithm {
    constructor(
        points,
        {
            populationSize = 100,
            mutationRate = 0.02,
            crossoverRate = 0.7,
            elitismCount = 1,
            onBestSolution = () => {},
            onPopulationChanged = () => {},
            onFitnessChanged = () => {},
        } = {},
    ) {
        this.points = points;
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
        this.elitismCount = elitismCount;
        this.onBestSolution = onBestSolution;
        this.onPopulationChanged = onPopulationChanged;
        this.onFitnessChanged = onFitnessChanged;

        this.distanceMatrix = this._computeDistanceMatrix(points);
        this.population = [];
        this.fitness = [];
        this.bestSolution = null;
        this.bestFitness = -Infinity;
        this.generation = 0;
        this.shouldStop = false;
    }

    _computeDistanceMatrix(points) {
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

    _distanceBetweenPoints(id1, id2) {
        // Find indexes of points by id
        const idx1 = this.points.findIndex((p) => p.id === id1);
        const idx2 = this.points.findIndex((p) => p.id === id2);
        return this.distanceMatrix[idx1][idx2];
    }

    _calculatePathDistance(path) {
        let dist = 0;
        for (let i = 0; i < path.length - 1; i++) {
            dist += this._distanceBetweenPoints(path[i], path[i + 1]);
        }
        // Close the loop back to start
        dist += this._distanceBetweenPoints(path[path.length - 1], path[0]);
        return dist;
    }

    _calculateFitness(path) {
        // Fitness is inverse of distance (larger fitness = better)
        const dist = this._calculatePathDistance(path);
        return 1 / dist;
    }

    _createRandomIndividual() {
        // Create a random permutation of point ids
        const ids = this.points.map((p) => p.id);
        for (let i = ids.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ids[i], ids[j]] = [ids[j], ids[i]];
        }
        return ids;
    }

    _initialPopulation() {
        this.population = [];
        for (let i = 0; i < this.populationSize; i++) {
            this.population.push(this._createRandomIndividual());
        }
    }

    _evaluatePopulation() {
        this.fitness = this.population.map((ind) =>
            this._calculateFitness(ind),
        );
        this.onFitnessChanged(this.fitness);

        // Update best solution
        const maxFitness = Math.max(...this.fitness);
        if (maxFitness > this.bestFitness) {
            this.bestFitness = maxFitness;
            this.bestSolution =
                this.population[this.fitness.indexOf(maxFitness)];
            this.onBestSolution(this.bestSolution, 1 / this.bestFitness);
        }
    }

    _selectParent() {
        // Roulette wheel selection
        const sumFitness = this.fitness.reduce((a, b) => a + b, 0);
        let rand = Math.random() * sumFitness;
        for (let i = 0; i < this.populationSize; i++) {
            rand -= this.fitness[i];
            if (rand <= 0) return this.population[i];
        }
        return this.population[this.populationSize - 1];
    }

    _crossover(parent1, parent2) {
        // Order Crossover (OX)
        if (Math.random() > this.crossoverRate) {
            return [...parent1];
        }
        const size = parent1.length;
        const child = Array(size).fill(null);

        const start = Math.floor(Math.random() * size);
        const end = Math.floor(Math.random() * size);

        const lower = Math.min(start, end);
        const upper = Math.max(start, end);

        // Copy a slice from parent1
        for (let i = lower; i <= upper; i++) {
            child[i] = parent1[i];
        }

        // Fill remaining positions from parent2 preserving order and avoiding duplicates
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

    _mutate(individual) {
        // Swap mutation
        for (let i = 0; i < individual.length; i++) {
            if (Math.random() < this.mutationRate) {
                const j = Math.floor(Math.random() * individual.length);
                [individual[i], individual[j]] = [individual[j], individual[i]];
            }
        }
    }

    _createNewPopulation() {
        const newPopulation = [];

        // Elitism: carry over the best individuals
        const sortedIndices = this.fitness
            .map((f, idx) => [f, idx])
            .sort((a, b) => b[0] - a[0])
            .map((pair) => pair[1]);

        for (let i = 0; i < this.elitismCount; i++) {
            newPopulation.push([...this.population[sortedIndices[i]]]);
        }

        while (newPopulation.length < this.populationSize) {
            const parent1 = this._selectParent();
            const parent2 = this._selectParent();

            let child = this._crossover(parent1, parent2);
            this._mutate(child);
            newPopulation.push(child);
        }

        this.population = newPopulation;
        this.onPopulationChanged(this.population);
    }

    runStep() {
        if (this.generation === 0) {
            this._initialPopulation();
            this.onPopulationChanged(this.population);
        }

        this._evaluatePopulation();
        this._createNewPopulation();

        this.generation++;
    }

    run({
        maxGenerations = 1000,
        callbackPerGeneration = null,
        callbackEnd = null,
    }) {
        this.shouldStop = false;

        // Runs until maxGenerations, optionally calling callback after each generation
        const loop = () => {
            this.runStep();
            callbackPerGeneration?.(
                this.generation,
                this.bestSolution,
                1 / this.bestFitness,
            );
            if (this.shouldStop) {
                return;
            }
            if (this.generation >= maxGenerations) {
                callbackEnd?.();
                return;
            }
            setTimeout(loop, 0); // Async to avoid blocking
        };
        loop();
    }

    stop() {
        this.shouldStop = true;
    }
}

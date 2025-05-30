export const Sections = {
    INTRO: 'intro',
    SELECTION: 'selection',
    CROSSOVER: 'crossover',
    MUTATIONS: 'mutations',
};

export function getTitle(title: Values<typeof Sections>) {
    switch (title) {
        case Sections.INTRO:
            return 'Genetic Population Variation';
        case Sections.SELECTION:
            return 'Selection Methods';
        case Sections.CROSSOVER:
            return 'Crossover';
        case Sections.MUTATIONS:
            return 'Mutations';
        default:
            throw new Error(`Unknown section title: ${title}`);
    }
}

export const Sections = {
    INTRO: 'intro',
    PIPELINE: 'pipeline',
    REPRESENTATION: 'representation',
    FITNESS: 'fitness',
};

export function getTitle(title: Values<typeof Sections>) {
    switch (title) {
        case Sections.INTRO:
            return 'Genetic Algorithm Overview';
        case Sections.PIPELINE:
            return 'Pipeline Overview';
        case Sections.REPRESENTATION:
            return 'Chromosomes Representation';
        case Sections.FITNESS:
            return 'Fitness Function';
        default:
            throw new Error(`Unknown section title: ${title}`);
    }
}

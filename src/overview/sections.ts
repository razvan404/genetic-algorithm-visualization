export const Sections = {
    INTRO: 'intro',
    OVERVIEW: 'overview',
    FITNESS: 'fitness',
    SELECTION: 'selection',
};

export function getTitle(title: Values<typeof Sections>) {
    switch (title) {
        case Sections.INTRO:
            return 'Genetic Algorithm Overview';
        case Sections.OVERVIEW:
            return 'Method Overview';
        case Sections.FITNESS:
            return 'Fitness Function';
        case Sections.SELECTION:
            return 'Selection Process';
        default:
            throw new Error(`Unknown section title: ${title}`);
    }
}

export const Sections = {
    INTRO: 'intro',
    DEFINITION: 'definition',
    COMPLEXITY: 'complexity',
    APPLICATIONS: 'applications',
};

export function getTitle(title: Values<typeof Sections>) {
    switch (title) {
        case Sections.INTRO:
            return 'Traveling Salesman Problem';
        case Sections.DEFINITION:
            return 'Problem Definition';
        case Sections.COMPLEXITY:
            return 'Problem Complexity';
        case Sections.APPLICATIONS:
            return 'Applications';
        default:
            throw new Error(`Unknown section title: ${title}`);
    }
}

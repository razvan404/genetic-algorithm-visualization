export const Sections = {
    INTRO: 'intro',
    DEFINITION: 'definition',
    COMPLEXITY: 'complexity',
    APPLICATIONS: 'applications',
};

export const Theme = {
    BACKGROUND_COLOR: '#FFFED1',
    HEADER_COLOR: 'rgba(253, 249, 128, 0.4)',
};

export function getTitle(title: string) {
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

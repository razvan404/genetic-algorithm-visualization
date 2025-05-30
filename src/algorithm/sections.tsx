export const Sections = {
    INTRO: 'intro',
    HYPERPARAMS: 'hyperparams',
    VISUALIZATION: 'visualization',
};

export function getTitle(title: Values<typeof Sections>) {
    switch (title) {
        case Sections.INTRO:
            return 'Genetic Algorithm Visualization';
        case Sections.HYPERPARAMS:
            return 'Hyperparameters';
        case Sections.VISUALIZATION:
            return 'Visualization';
        default:
            throw new Error(`Unknown section title: ${title}`);
    }
}

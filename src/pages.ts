const Pages = {
    HOME: 'home',
    TSP: 'tsp',
    OVERVIEW: 'overview',
    DIVERSITY: 'diversity',
    VARIATIONS: 'variations',
    ALGORITHM: 'algorithm',
} as const;

export default Pages;

export const getRoute = (page: Values<typeof Pages>): string => {
    switch (page) {
        case Pages.HOME:
            return '/';
        case Pages.TSP:
            return '/tsp';
        case Pages.OVERVIEW:
            return '/overview';
        case Pages.DIVERSITY:
            return '/diversity';
        case Pages.VARIATIONS:
            return '/variations';
        case Pages.ALGORITHM:
            return '/algorithm';
        default:
            throw new Error(`Unknown page: ${page}`);
    }
};

export const getTitle = (page: Values<typeof Pages>): string => {
    switch (page) {
        case Pages.HOME:
            return 'Home';
        case Pages.TSP:
            return 'Traveling Salesman Problem';
        case Pages.OVERVIEW:
            return 'Overview';
        case Pages.DIVERSITY:
            return 'Population Diversity';
        case Pages.VARIATIONS:
            return 'Genetic Variation';
        case Pages.ALGORITHM:
            return 'Algorithm';
        default:
            throw new Error(`Unknown page: ${page}`);
    }
};

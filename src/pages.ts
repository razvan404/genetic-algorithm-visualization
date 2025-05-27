const Pages = {
    HOME: 'home',
    TSP: 'tsp',
    OVERVIEW: 'overview',
    VARIATION: 'variation',
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
        case Pages.VARIATION:
            return '/variation';
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
        case Pages.VARIATION:
            return 'Population Variation';
        case Pages.ALGORITHM:
            return 'Algorithm';
        default:
            throw new Error(`Unknown page: ${page}`);
    }
};

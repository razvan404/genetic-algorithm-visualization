import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './home';
import { TspPage } from './tsp';
import { OverviewPage } from './overview';
import { VariationPage } from './variation';
import { AlgorithmPage } from './algorithm';
import Pages, { getRoute } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={getRoute(Pages.HOME)} element={<HomePage />} />
                <Route path={getRoute(Pages.TSP)} element={<TspPage />} />
                <Route
                    path={getRoute(Pages.OVERVIEW)}
                    element={<OverviewPage />}
                />
                <Route
                    path={getRoute(Pages.VARIATION)}
                    element={<VariationPage />}
                />
                <Route
                    path={getRoute(Pages.ALGORITHM)}
                    element={<AlgorithmPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

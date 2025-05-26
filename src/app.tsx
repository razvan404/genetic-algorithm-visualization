import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './home';
import { TspPage } from './tsp';
import Pages, { getRoute } from './pages';

function App() {
    Math.random();
    return (
        <BrowserRouter>
            <Routes>
                <Route path={getRoute(Pages.HOME)} element={<HomePage />} />
                <Route path={getRoute(Pages.TSP)} element={<TspPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

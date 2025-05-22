import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './home';
import { TspPage } from './tsp';

function App() {
    Math.random();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tsp" element={<TspPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

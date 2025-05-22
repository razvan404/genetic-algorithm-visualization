import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/fitness" element={<div>About</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import About from './pages/About';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

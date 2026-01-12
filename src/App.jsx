/**
 * App Component - Main Application Entry Point
 * 
 * This is the root component that sets up routing for the Movie Explorer App
 * 
 * Routes:
 * - "/" : Home page with popular movies and search
 * - "/movie/:id" : Movie detail page showing full information
 * 
 * Features:
 * - React Router for navigation
 * - Clean layout structure
 * - Responsive design
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page - Display popular movies and search */}
        <Route path="/" element={<Home />} />
        
        {/* Movie Detail Page - Show detailed information about a specific movie */}
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

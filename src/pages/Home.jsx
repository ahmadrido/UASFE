/**
 * Home Page Component
 * 
 * Main landing page of the Movie Explorer App
 * Features:
 * - Display popular movies in a grid
 * - Search functionality with real-time results
 * - Loading states during API calls
 * - Error handling with user-friendly messages
 * - Empty state when no results found
 * 
 * State Management:
 * - movies: Array of movies to display
 * - searchQuery: Current search input value
 * - loading: Boolean for loading state
 * - error: Error message string
 * - isSearching: Boolean to track if user is searching
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchPopularMovies, searchMovies } from '../services/api';
import logo from '../../public/logo.png';

const Home = () => {
  // Navigation hook for routing
  const navigate = useNavigate();

  // State management
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  /**
   * Load popular movies on component mount
   * This runs once when the component first renders
   */
  useEffect(() => {
    loadPopularMovies();
  }, []);

  /**
   * Search movies when search query changes
   * Debounced effect to avoid too many API calls
   */
  useEffect(() => {
    // Only search if there's a query
    if (searchQuery.trim()) {
      // Set a timeout to debounce the search
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500); // Wait 500ms after user stops typing

      // Cleanup function to clear timeout if query changes
      return () => clearTimeout(timeoutId);
    } else {
      // If search is cleared, load popular movies again
      if (isSearching) {
        setIsSearching(false);
        loadPopularMovies();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  /**
   * Load popular movies from API
   */
  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error loading popular movies:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Search movies by query
   */
  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);
      const data = await searchMovies(searchQuery);
      setMovies(data);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Navigate to movie detail page
   */
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-secondary to-accent shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* App Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
              <img src={logo} alt="MoviePedia Logo" className="inline-block w-15 h-15 md:w-25 md:h-25 mr-2" /> Movie Explorer
            </h1>
          </div>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            placeholder="Search for movies..."
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            {isSearching ? (
              <>
                Search Results for "{searchQuery}"
                <span className="text-gray-400 text-lg ml-2">
                  ({movies.length} {movies.length === 1 ? 'movie' : 'movies'})
                </span>
              </>
            ) : (
              'Popular Movies'
            )}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          /* Movie Grid */
          <MovieList movies={movies} onMovieClick={handleMovieClick} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-secondary mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>
            Movie data provided by{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-highlight hover:underline"
            >
              The Movie Database (TMDB)
            </a>
          </p>
          <p className="text-sm mt-2">
            © 2026 Movie Explorer - All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

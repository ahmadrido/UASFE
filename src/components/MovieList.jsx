/**
 * MovieList Component
 * 
 * Displays a grid of movie cards
 * Features:
 * - Responsive grid layout (1-6 columns based on screen size)
 * - Empty state when no movies
 * - Proper spacing and alignment
 * 
 * Props:
 * @param {Array} movies - Array of movie objects to display
 * @param {function} onMovieClick - Callback function when a movie card is clicked
 */

import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick }) => {
  // Show empty state if no movies
  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <svg
          className="w-24 h-24 text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <h3 className="text-xl text-gray-400 mb-2">No Movies Found</h3>
        <p className="text-gray-500 text-center max-w-md">
          We couldn't find any movies matching your search. Try different keywords or browse popular movies.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 
                      gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;

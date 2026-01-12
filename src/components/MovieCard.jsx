/**
 * MovieCard Component
 * 
 * Displays a single movie card with poster, title, and rating
 * Features:
 * - Hover effects with scale animation
 * - Star rating display
 * - Responsive design
 * - Click handler for navigation to movie details
 * 
 * Props:
 * @param {Object} movie - Movie object containing id, title, poster_path, vote_average
 * @param {function} onClick - Callback function when card is clicked
 */

import { getImageUrl, formatRating } from '../services/api';

const MovieCard = ({ movie, onClick }) => {
  // Handle card click
  const handleClick = () => {
    if (onClick) {
      onClick(movie.id);
    }
  };

  // Handle keyboard navigation (accessibility)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      className="group cursor-pointer bg-secondary rounded-lg overflow-hidden 
                 shadow-lg hover:shadow-2xl transform hover:scale-105 
                 transition-all duration-300 ease-in-out"
      aria-label={`View details for ${movie.title}`}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-accent">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm line-clamp-3">
              {movie.overview || 'No description available'}
            </p>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full 
                        px-2 py-1 flex items-center gap-1">
          <svg
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-white text-sm font-semibold">
            {formatRating(movie.vote_average)}
          </span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 flex flex-col justify-between h-30">
        <h3 className="text-black font-semibold text-lg line-clamp-2 mb-2 
                       group-hover:text-highlight transition-colors duration-300">
          {movie.title}
        </h3>
        
        {/* Release Year */}
        {movie.release_date && (
          <p className="text-gray-400 text-sm">
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

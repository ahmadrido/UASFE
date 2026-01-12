/**
 * MovieDetail Page Component
 * 
 * Detailed view of a single movie
 * Features:
 * - Full movie information (poster, title, rating, overview, release date)
 * - Backdrop image with gradient overlay
 * - Back button to return to home
 * - Loading state while fetching data
 * - Error handling
 * - Responsive design
 * 
 * State Management:
 * - movie: Movie details object
 * - loading: Boolean for loading state
 * - error: Error message string
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchMovieDetails, getImageUrl, formatDate, formatRating } from '../services/api';

const MovieDetail = () => {
  // Get movie ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // State management
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch movie details when component mounts or ID changes
   */
  useEffect(() => {
    loadMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * Load movie details from API
   */
  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError('Failed to load movie details. Please try again.');
      console.error('Error loading movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate back to home page
   */
  const handleBack = () => {
    navigate('/');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error state
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error || 'Movie not found'}</p>
          <button
            onClick={handleBack}
            className="bg-highlight hover:bg-highlight/80 text-white px-6 py-3 rounded-lg
                       transition-colors duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Backdrop Image Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Backdrop Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path || movie.poster_path, 'original')})`,
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-primary/90"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white 
                     px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2
                     transition-all duration-300 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 md:-mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={`${movie.title} poster`}
              className="w-full md:w-80 rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Information */}
          <div className="flex-1 text-black">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl md:text-white text-black font-bold mb-4">
              {movie.title}
            </h1>

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-xl md:text-gray-300 italic mb-6">
                "{movie.tagline}"
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 bg-white/40 p-4 rounded-lg backdrop-blur-lg">
              {/* Rating */}
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{formatRating(movie.vote_average)}</span>
                <span className="text-gray-700">/10</span>
              </div>

              {/* Release Date */}
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formatDate(movie.release_date)}</span>
              </div>

              {/* Runtime */}
              {movie.runtime && (
                <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{movie.runtime} min</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-black backdrop-blur-md text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary p-6 rounded-lg">
              {/* Budget */}
              {movie.budget > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Budget</h3>
                  <p className="font-semibold">
                    ${movie.budget.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Revenue */}
              {movie.revenue > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Revenue</h3>
                  <p className="font-semibold">
                    ${movie.revenue.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Status */}
              {movie.status && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Status</h3>
                  <p className="font-semibold">{movie.status}</p>
                </div>
              )}

              {/* Original Language */}
              {movie.original_language && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Original Language</h3>
                  <p className="font-semibold uppercase">{movie.original_language}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default MovieDetail;

/**
 * API Service for TMDB (The Movie Database)
 * 
 * This service handles all API calls to TMDB.
 * Features:
 * - Fetch popular movies
 * - Search movies by title
 * - Get movie details by ID
 * - Error handling with fallback dummy data
 */

// TMDB API Configuration 
const API_KEY = import.meta.env.REACT_APP_TMDB_API_KEY;
// indonesian language
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Dummy data fallback for demo/presentation purposes
 * Used when API fails or for testing without API key
 */
const DUMMY_MOVIES = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
    vote_average: 8.7,
    release_date: "1994-09-23"
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
    vote_average: 8.7,
    release_date: "1972-03-14"
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
    vote_average: 8.5,
    release_date: "2008-07-16"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    overview: "A burger-loving hit man, his philosophical partner, and a drug-addled gangster's moll.",
    vote_average: 8.5,
    release_date: "1994-09-10"
  },
  {
    id: 5,
    title: "Forrest Gump",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/7c9UVPPiTPltouxRVY6N9uUaHNd.jpg",
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events.",
    vote_average: 8.4,
    release_date: "1994-06-23"
  },
  {
    id: 6,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets.",
    vote_average: 8.4,
    release_date: "2010-07-15"
  }
];

/**
 * Get the full URL for movie poster images
 * @param {string} path - The poster path from API
 * @param {string} size - Image size (w200, w500, original)
 * @returns {string} Full image URL
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Fetch popular movies from TMDB
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of movie objects
 */
export const fetchPopularMovies = async (page = 1) => {
  try {
    // Check if API key is set
    if (API_KEY === 'YOUR_TMDB_API_KEY') {
      console.warn('Using dummy data - Please set your TMDB API key in services/api.js');
      return DUMMY_MOVIES;
    }

    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}` ,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    // Return dummy data as fallback
    return DUMMY_MOVIES;
  }
};

/**
 * Search movies by title
 * @param {string} query - Search query string
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of movie objects matching the search
 */
export const searchMovies = async (query, page = 1) => {
  try {
    if (!query.trim()) {
      return [];
    }

    // Check if API key is set
    if (API_KEY === 'YOUR_TMDB_API_KEY') {
      console.warn('Using dummy data - Please set your TMDB API key in services/api.js');
      // Filter dummy data based on search query
      return DUMMY_MOVIES.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
      }
    }
    );

    if (!response.ok) {
      throw new Error('Failed to search movies');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    // Return filtered dummy data as fallback
    return DUMMY_MOVIES.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }
};

/**
 * Fetch detailed information about a specific movie
 * @param {number} movieId - The ID of the movie
 * @returns {Promise<Object>} Movie details object
 */
export const fetchMovieDetails = async (movieId) => {
  try {
    // Check if API key is set
    if (API_KEY === 'YOUR_TMDB_API_KEY') {
      console.warn('Using dummy data - Please set your TMDB API key in services/api.js');
      const movie = DUMMY_MOVIES.find(m => m.id === parseInt(movieId));
      return movie || DUMMY_MOVIES[0];
    }

    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    // Return dummy data as fallback
    const movie = DUMMY_MOVIES.find(m => m.id === parseInt(movieId));
    return movie || DUMMY_MOVIES[0];
  }
};

/**
 * Format release date to readable format
 * @param {string} dateString - Date string from API (YYYY-MM-DD)
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format rating to one decimal place
 * @param {number} rating - Rating value
 * @returns {string} Formatted rating
 */
export const formatRating = (rating) => {
  if (!rating) return 'N/A';
  return rating.toFixed(1);
};

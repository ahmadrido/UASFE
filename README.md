# 🎬 Movie Explorer App

A modern, responsive Movie Explorer web application built with React. This project allows users to browse popular movies, search for specific titles, and view detailed information about each movie using the TMDB (The Movie Database) API.

## 📋 Project Overview

This is an academic group assignment demonstrating frontend development skills with React, API integration, and responsive design principles.

## ✨ Features

### Core Features
- **Popular Movies Display**: Browse trending and popular movies in an attractive grid layout
- **Movie Search**: Real-time search functionality with debouncing for optimal performance
- **Movie Details**: View comprehensive information including:
  - Movie poster and backdrop images
  - Title, tagline, and overview
  - Rating (out of 10)
  - Release date
  - Runtime
  - Genres
  - Budget and revenue (when available)
  - Status and original language

### UX Features
- **Loading States**: Smooth loading spinners during API calls
- **Error Handling**: User-friendly error messages when things go wrong
- **Empty States**: Helpful messages when no results are found
- **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile devices
- **Hover Effects**: Interactive hover animations on movie cards
- **Dummy Data Fallback**: Built-in dummy data for demos without API key

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ (Functional Components & Hooks)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom color scheme
- **Build Tool**: Vite
- **API**: TMDB (The Movie Database) API
- **HTTP Client**: Native Fetch API

## 📁 Project Structure

```
UASFE/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable React components
│   │   ├── LoadingSpinner.jsx    # Loading indicator component
│   │   ├── MovieCard.jsx         # Individual movie card display
│   │   ├── MovieList.jsx         # Grid layout for movie cards
│   │   └── SearchBar.jsx         # Search input component
│   ├── pages/              # Page-level components
│   │   ├── Home.jsx             # Home page with popular movies & search
│   │   └── MovieDetail.jsx      # Movie detail page
│   ├── services/           # API service layer
│   │   └── api.js              # TMDB API integration & helpers
│   ├── App.jsx             # Main app component with routing
│   ├── index.css           # Global styles (Tailwind imports)
│   └── main.jsx            # React entry point
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- TMDB API key (optional - dummy data available for testing)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd c:\xampp\htdocs\UASFE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure TMDB API Key** (Optional)
   - Sign up for a free account at [TMDB](https://www.themoviedb.org/)
   - Get your API key from [API Settings](https://www.themoviedb.org/settings/api)
   - Open `src/services/api.js`
   - Replace `'YOUR_TMDB_API_KEY'` with your actual API key:
     ```javascript
     const API_KEY = 'your_actual_api_key_here';
     ```
   - **Note**: The app works with dummy data if no API key is set (perfect for demos!)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📚 Component Documentation

### API Service Layer (`services/api.js`)

The API service provides a centralized way to interact with TMDB API.

**Key Functions:**
- `fetchPopularMovies(page)` - Fetches popular movies with pagination
- `searchMovies(query, page)` - Searches movies by title
- `fetchMovieDetails(movieId)` - Gets detailed information for a specific movie
- `getImageUrl(path, size)` - Constructs full image URLs
- `formatDate(dateString)` - Formats dates to readable format
- `formatRating(rating)` - Formats ratings to one decimal place

**Error Handling:**
All API functions include try-catch blocks and return dummy data as fallback when:
- API key is not configured
- Network requests fail
- Invalid responses are received

### Component Architecture

#### 1. **MovieCard Component**
Displays a single movie in card format with poster, title, and rating.

**Props:**
- `movie` (Object): Movie data containing id, title, poster_path, vote_average
- `onClick` (Function): Callback when card is clicked

**Features:**
- Hover effects with scale animation
- Overlay with movie description on hover
- Rating badge with star icon
- Responsive image loading
- Accessibility support (keyboard navigation)

#### 2. **MovieList Component**
Renders a responsive grid of movie cards.

**Props:**
- `movies` (Array): Array of movie objects
- `onMovieClick` (Function): Callback for movie selection

**Features:**
- Responsive grid (1-6 columns based on screen size)
- Empty state with helpful message
- Automatic layout adjustments

#### 3. **SearchBar Component**
Search input with real-time query updates.

**Props:**
- `value` (String): Current search query
- `onChange` (Function): Callback for input changes
- `onSearch` (Function): Callback for search submission
- `placeholder` (String): Placeholder text

**Features:**
- Search icon indicator
- Clear button when text is entered
- Focus states with highlight color
- Accessible labels

#### 4. **LoadingSpinner Component**
Animated loading indicator.

**Features:**
- Spinning ring animation
- Pulsing center circle
- Centered layout
- Customizable colors via Tailwind

### Page Components

#### 1. **Home Page** (`pages/Home.jsx`)

The main landing page displaying popular movies and search functionality.

**State Management:**
- `movies` - Array of movies to display
- `searchQuery` - Current search input
- `loading` - Loading state boolean
- `error` - Error message string
- `isSearching` - Tracks if user is actively searching

**Key Features:**
- Loads popular movies on mount
- Debounced search (500ms delay)
- Automatic switch between popular and search results
- Error display with retry option
- Responsive header with app branding

**useEffect Hooks:**
1. Initial data load on component mount
2. Search effect with debouncing on query change

#### 2. **MovieDetail Page** (`pages/MovieDetail.jsx`)

Detailed view of a single movie with comprehensive information.

**State Management:**
- `movie` - Movie details object
- `loading` - Loading state
- `error` - Error message

**Key Features:**
- Backdrop image with gradient overlay
- Large poster display
- Complete movie metadata
- Back button navigation
- Responsive two-column layout (mobile stacks vertically)

**URL Parameter:**
- Uses `useParams()` to get movie ID from URL path

## 🎨 Styling & Design

### Color Scheme
The app uses a dark theme with custom colors defined in Tailwind config:

- **Primary**: `#1a1a2e` - Dark background
- **Secondary**: `#16213e` - Card backgrounds
- **Accent**: `#0f3460` - Borders and secondary elements
- **Highlight**: `#e94560` - Interactive elements and CTAs

### Responsive Breakpoints
- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2-3 columns)
- **Desktop**: > 1024px (4-6 columns)

### Typography
- **Headings**: Bold, varying sizes (4xl - 2xl)
- **Body**: Regular weight, good contrast
- **Ratings**: Semibold with yellow star icon

## 🔧 Configuration Files

### Tailwind Config (`tailwind.config.js`)
Defines custom color theme and content paths for purging unused styles.

### Vite Config (`vite.config.js`)
Configured with React plugin and Tailwind CSS plugin for optimal development experience.

## 📝 Usage Examples

### Basic Navigation Flow
1. User lands on home page → sees popular movies
2. User types in search bar → sees filtered results
3. User clicks on a movie card → navigates to detail page
4. User clicks back button → returns to previous search or popular movies

### API Integration Example
```javascript
// In your component
import { fetchPopularMovies } from './services/api';

const loadMovies = async () => {
  const movies = await fetchPopularMovies();
  setMovies(movies);
};
```

## 🐛 Error Handling

The app handles various error scenarios:

1. **API Failures**: Displays error message and uses dummy data
2. **No API Key**: Automatically uses dummy data for demos
3. **Empty Search Results**: Shows friendly "no movies found" message
4. **Missing Movie Details**: Shows error page with back button
5. **Network Issues**: Catches and displays appropriate messages

## 📱 Responsive Design

The application is fully responsive across all device sizes:

- **Mobile**: Single column layout, simplified navigation
- **Tablet**: 2-3 columns, touch-friendly interactions
- **Desktop**: 4-6 columns, hover effects, optimal spacing

## 🎓 Academic Requirements Met

✅ Frontend-only implementation (no backend)  
✅ React with functional components and hooks  
✅ Public API integration (TMDB)  
✅ Search functionality  
✅ Detailed movie information  
✅ Responsive design  
✅ Error handling  
✅ Loading states  
✅ Clean code with comments  
✅ Component-based architecture  
✅ Dummy data fallback for presentations  

## 🚀 Build for Production

To create a production-ready build:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

To preview the production build:

```bash
npm run preview
```

## 📦 Dependencies

### Core Dependencies
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Client-side routing

### Dev Dependencies
- `@vitejs/plugin-react` - Vite React plugin
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `@tailwindcss/vite` - Tailwind Vite plugin
- `eslint` - Code linting

## 🎯 Future Enhancements

Potential features for future iterations:
- Add movie trailers using TMDB video API
- Implement infinite scroll for pagination
- Add movie recommendations
- Create watchlist functionality with localStorage
- Add filter options (genre, year, rating)
- Implement dark/light theme toggle
- Add movie cast and crew information

## 👥 Team & Credits

- **Project Type**: Academic Group Assignment
- **API Provider**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **Framework**: React
- **Year**: 2026

## 📄 License

This is an academic project for educational purposes.

---

**Happy Movie Exploring! 🍿🎥**

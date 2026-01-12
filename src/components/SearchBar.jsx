/**
 * SearchBar Component
 * 
 * A reusable search input component for movie search functionality
 * Features:
 * - Real-time search input
 * - Clear button when text is entered
 * - Responsive design
 * - Accessible with proper labels
 * 
 * Props:
 * @param {string} value - Current search query value
 * @param {function} onChange - Callback function when search input changes
 * @param {function} onSearch - Callback function when search is submitted
 * @param {string} placeholder - Placeholder text for the input
 */

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search movies..." }) => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch();
    }
  };

  // Handle clear button click
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-secondary border-2 border-accent text-black rounded-lg 
                     focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/50
                     placeholder-gray-700 transition-all duration-300 border-black/50"
          aria-label="Search movies"
        />

        {/* Clear Button - Only show when there's text */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Optional: Search button for mobile */}
      <button
        type="submit"
        className="hidden" // Hidden but functional for accessibility
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

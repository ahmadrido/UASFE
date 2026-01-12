/**
 * LoadingSpinner Component
 * 
 * A reusable loading indicator component
 * Displays an animated spinner while content is loading
 */

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-gray-300 border-t-highlight rounded-full animate-spin"></div>
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-highlight rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;


import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-nuclear-500">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Oops! Page not found</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-nuclear-500 text-white rounded-lg hover:bg-nuclear-600 transition-colors inline-flex items-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

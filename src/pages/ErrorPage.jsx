import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-blue-300 text-center px-6">
      {/* Big 404 */}
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Oops! The page you’re looking for doesn’t exist. Maybe it was removed
        or the link is broken.  
      </p>

      {/* Button to go back */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition duration-200"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

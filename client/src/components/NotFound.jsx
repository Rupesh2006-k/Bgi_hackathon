import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <AlertTriangle size={40} className="text-orange-500" />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-gray-900">404</h1>

      <p className="mt-3 text-lg font-semibold text-gray-700">
        Page Not Found
      </p>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
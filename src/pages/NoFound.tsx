import { Link } from "react-router-dom";

const NoFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-400 tracking-widest">
        404
      </h1>
      <div className="bg-blue-500 px-2 text-sm text-white rounded rotate-12 absolute mt-[-40px]">
        Page Not Found
      </div>
      <p className="text-gray-600 mt-4 text-lg">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NoFound;

import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
            <p className="text-lg text-gray-700 mb-8">We couldn't find the page you were looking for.</p>
            <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                Go Home
            </Link>
        </div>
    );
};

export default Error;

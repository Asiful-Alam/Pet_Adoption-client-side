// CategoryCard.js

import { Link } from "react-router-dom";

const CategoryCard = ({ item }) => { 
    const { pet_image, pet_name, pet_age, category } = item; 
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/category?category=${category}`} className="block"> {/* Updated Link to pass category as query parameter */}
          <img className="w-full h-40 object-cover rounded-t-lg" src={pet_image} alt={pet_name} />
        </Link>
        <div className="p-5">
          <Link to={`/category?category=${category}`} className="block"> {/* Updated Link to pass category as query parameter */}
            <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white hover:underline">{category}</h5>
            <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white hover:underline">{pet_name}</h5>
          </Link>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">{pet_age}</p>
          <Link to={`/category?category=${category}`} className="inline-block px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800 transition duration-300 ease-in-out">
            Show All
          </Link>
        </div>
      </div>
    );
};

export default CategoryCard;

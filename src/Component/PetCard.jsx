import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
    const { name, photo, age, location, _id } = pet;

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            
            <div className="flex flex-col items-center pb-10">
                <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={photo}
                    alt={`${name} image`}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Age: {age} | Location: {location}
                </span>
                <Link to={`/allpetdetails/${_id}`} className="mt-4">
  <button className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
    View Details
  </button>
</Link>

            </div>
        </div>
    );
};

export default PetCard;

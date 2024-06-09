import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
    const { name, photo, age, location, _id } = pet;

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="flex flex-col items-center pb-10">
                <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={photo}
                    alt={`${name} image`}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900">
                    {name}
                </h5>
                <span className="text-sm text-gray-500">
                    Age: {age} | Location: {location}
                </span>
                <Link to={`/allpetdetails/${_id}`} className="mt-4">
                    <button className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-lightPurple rounded-lg border border-gray-200 hover:bg-purple-100 hover:text-deepPurple focus:ring-2 focus:ring-purple-100">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PetCard;

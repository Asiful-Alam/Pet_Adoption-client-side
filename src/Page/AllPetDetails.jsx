import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AllPetDetails = () => {
    const { id } = useParams();
    const [petDetails, setPetDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/pets/${id}`)
            .then(response => response.json())
            .then(data => {
                setPetDetails(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pet details:', error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="p-4 max-w-screen-md mx-auto">
            {loading ? (
                <p>Loading...</p>
            ) : petDetails ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">Pet Details</h1>
                    <img src={petDetails.photo} alt={petDetails.name} className="w-32 h-32 mb-4 rounded-full shadow-lg" />
                    <p className="text-lg"><strong>Name:</strong> {petDetails.name}</p>
                    <p className="text-lg"><strong>Age:</strong> {petDetails.age}</p>
                    <p className="text-lg"><strong>Location:</strong> {petDetails.location}</p>
                    <button className="mt-4 py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Adopt
                    </button>
                </>
            ) : (
                <p>Pet not found</p>
            )}
        </div>
    );
};

export default AllPetDetails;

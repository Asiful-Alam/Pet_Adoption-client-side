// AllPet.jsx
import { useLoaderData } from 'react-router-dom';
import AllPetTable from './AllPetTable';


const AllPetAdmin = () => {
    const pets = useLoaderData();
    
    return (
       <div>
       
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Pets ({pets.length})</h1>
            <AllPetTable pets={pets} />
        </div>
       </div>
    );
};

export default AllPetAdmin;

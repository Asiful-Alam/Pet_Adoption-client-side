
import { useLoaderData } from 'react-router-dom';
import PetCard from '../Component/PetCard';
import Navbar from '../Component/Navbar';

const AllPet = () => {
    const pets=useLoaderData();
    return (
       <div>
        <div><Navbar></Navbar></div>
        <div>
            <div>
        <h1>All Pets {pets.length}</h1>
      </div>
      {
        pets.map(pets => <PetCard key={pets._id}
        pets={pets}></PetCard>)
      }
        </div>
       </div>
    );
};

export default AllPet;
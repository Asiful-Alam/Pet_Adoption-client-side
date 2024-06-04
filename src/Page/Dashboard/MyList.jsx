import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider'; // Assuming AuthContext provides user information

const MyList = () => {
  const { user } = useContext(AuthContext) || {};
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/petlist/${user?.email}`, // Fetch from mylist endpoint
          { credentials: 'include' } // Include credentials for authorization
        );
        if (response.ok) {
          const data = await response.json();
          setPets(data);
        } else {
          console.error('Failed to fetch pets:', response.status);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };



    if (user?.email) {
      fetchPets();
    }
  }, [user?.email]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Category</th>
            <th>Location</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet, index) => (
            <tr key={pet._id} className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'}`}>
              <td className="border px-4 py-2">{pet.name}</td>
              <td className="border px-4 py-2">{pet.age}</td>
              <td className="border px-4 py-2">{pet.category}</td>
              <td className="border px-4 py-2">{pet.location}</td>
              <td className="border px-4 py-2">{pet.shortDescription}</td>
              <td className="border px-4 py-2">
                <div className="flex flex-row">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded mr-2">
                    Delete
                  </button>
                  <Link to={`/update/${pet._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded">
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyList;
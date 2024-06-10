import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';
import MyListCard from '../Dashboard/MyListCard';
import Swal from 'sweetalert2';

const MyList = () => {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mypets/${user?.email}`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setPets(data);
        } else {
          console.error('Failed to fetch pets:', response.status);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchPets();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:5000/pets/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`, // Assuming you have a token stored in user object
            },
          });
          if (res.status === 200) {
            setPets(pets.filter(pet => pet._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your pet has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the pet.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error('Error deleting pet:', error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the pet.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleUpdate = (id) => {
    // Implement your update logic here
    console.log('Update pet with id:', id);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/pets/${id}`, { 
        adopted: newStatus,
        // Include image and name fields in the request body
        image: pets.find(pet => pet._id === id).image,
        name: pets.find(pet => pet._id === id).name,
        category: pets.find(pet => pet._id === id).category,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Assuming you have a token stored in user object
        },
      });
      if (response.status === 200) {
        setPets(pets.map(pet => pet._id === id ? { ...pet, adopted: newStatus } : pet));
      }
    } catch (error) {
      console.error('Error updating pet status:', error);
    }
  };
  

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10">
        <Skeleton height={40} count={6} />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">My Pets</h1>
      {pets.length > 0 ? (
        pets.map((pet, index) => (
          <MyListCard
            key={pet._id}
            pet={pet}
            serialNumber={index + 1}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))
      ) : (
        <p>No pets found.</p>
      )}
    </div>
  );
};

export default MyList;

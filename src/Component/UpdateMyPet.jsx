import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../provider/AuthProvider';

const UpdateMyPet = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`https://full-project-server.vercel.app/pets/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPet(data);
        } else {
          console.error('Failed to fetch pet:', response.status);
        }
      } catch (error) {
        console.error('Error fetching pet:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPet({
      ...pet,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://full-project-server.vercel.app/pets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(pet),
      });
      if (!response.ok) {
        throw new Error('Failed to update pet');
      }
      Swal.fire({
        title: 'Success!',
        text: 'Pet updated successfully',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error updating pet:', error);
      let errorMessage = 'Failed to update pet';
      if (error instanceof SyntaxError) {
        errorMessage = 'Invalid JSON format in server response';
      }
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
      });
    }
  };
  
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Update Pet</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={pet.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Category:</label>
          <input
            type="text"
            name="category"
            value={pet.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="adopted"
              checked={pet.adopted}
              onChange={handleChange}
              className="mr-2"
            />
            Adopted
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMyPet;

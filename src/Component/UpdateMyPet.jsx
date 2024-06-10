import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import {  useAuth } from '../provider/AuthProvider';

const UpdateMyPet = () => {
  const { id } = useParams();
  const {user}= useAuth();
//   const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pets/${id}`);
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
      const response = await fetch(`http://localhost:5000/pets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(pet), // Send the updated pet data directly
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Pet</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={pet.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={pet.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Adopted:
          <input
            type="checkbox"
            name="adopted"
            checked={pet.adopted}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMyPet;

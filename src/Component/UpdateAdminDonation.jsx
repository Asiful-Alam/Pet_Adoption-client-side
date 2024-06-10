import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateAdminDonation = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    maxDonation: '',
    lastDate: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donation/${id}`);
        setFormData({
          maxDonation: response.data.maxDonation,
          lastDate: response.data.lastDate,
          email: response.data.email,
        });
      } catch (error) {
        console.error('Error fetching donation:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/donation/${id}`, formData);
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Donation updated successfully",
          icon: "success",
        });
        // Optionally, you can redirect the user or perform other actions upon successful update
      } else {
        // Handle other status codes if needed
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error updating donation:', error);
      // Optionally, you can show an error message to the user
      Swal.fire({
        title: "Error",
        text: "Failed to update donation. Please try again later.",
        icon: "error",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Max Donation:
          <input type="text" name="maxDonation" value={formData.maxDonation} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Date:
          <input type="text" name="lastDate" value={formData.lastDate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateAdminDonation;

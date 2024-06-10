import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit, FaPause, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const AllDonation = () => {
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://full-project-server.vercel.app/donation?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const newData = response.data;
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setDonations((prevData) => [...prevData, ...newData]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchData();
  }, [page, token]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 30;
    if (isNearBottom && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    tableRef.current.addEventListener('scroll', handleScroll);
    return () => {
      tableRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore]);

  const handleDeleteDonation = (donation) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`https://full-project-server.vercel.app/donation/${donation._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "The donation has been deleted.",
                icon: "success",
              });
              // Update UI after successful deletion
              setDonations((prevDonations) =>
                prevDonations.filter(d => d._id !== donation._id)
              );
            } else {
              // If no donation was deleted, show an error
              Swal.fire({
                title: "Error",
                text: "Failed to delete the donation. Please try again later.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting donation:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to delete the donation. Please try again later.",
              icon: "error",
            });
          });
      }
    });
  };
  

  // const handlePauseDonation = (id) => {
  //   axios.put(`https://full-project-server.vercel.app/donation/${id}/pause`, {}, {
  //     headers: {
  //       Authorization: `Bearer ${token}` // Include the token in the headers
  //     }
  //   })
  //     .then(() => {
  //       setDonations((prevDonations) =>
  //         prevDonations.map(donation =>
  //           donation._id === id ? { ...donation, isPaused: !donation.isPaused } : donation
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error updating donation status:", error);
  //       // Optionally, you can show an error message to the user
  //     });
  // };
  

  return (
    <div className="overflow-x-auto">
      <div className="max-h-screen px-4">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">All Donations: {donations.length}</h2>
        <div ref={tableRef} className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-2 sm:px-4">No</th>
                <th className="px-2 py-2 sm:px-4">Picture</th>
                <th className="px-2 py-2 sm:px-4">Max Donation</th>
                <th className="px-2 py-2 sm:px-4">Last Date</th>
                <th className="px-2 py-2 sm:px-4">Email</th>
                <th className="px-2 py-2 sm:px-4">Created At</th>
                <th className="px-2 py-2 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td className="border px-2 py-2 sm:px-4">{index + 1}</td>
                  <td className="border px-2 py-2 sm:px-4"><img src={donation.petPicture} alt="Pet" className="w-16 h-16 sm:w-20 sm:h-20 object-cover" /></td>
                  <td className="border px-2 py-2 sm:px-4">{donation.maxDonation}</td>
                  <td className="border px-2 py-2 sm:px-4">{donation.lastDate}</td>
                  <td className="border px-2 py-2 sm:px-4">{donation.email}</td>
                  <td className="border px-2 py-2 sm:px-4">{new Date(donation.createdAt).toLocaleString()}</td>
                  <td className="border px-2 py-2 sm:px-4">
                    <Link to={`/dashboard/updateadmindonation/${donation._id}`}>
                      <button className="mr-2 text-purple-600 hover:text-purple-800"><FaEdit /></button>
                    </Link>
                    <button onClick={() => handleDeleteDonation(donation)} className="mr-2 text-purple-600 hover:text-purple-800"><FaTrash /></button>
                    <button onClick={() => handlePauseDonation(donation._id)} className="text-purple-600 hover:text-purple-800">
                      {donation.isPaused ? "Resume" : <FaPause />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && <div>Loading more...</div>}
        {!hasMore && <div>No more data</div>}
      </div>
    </div>
  );
};

export default AllDonation;

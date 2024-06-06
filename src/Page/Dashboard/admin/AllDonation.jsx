// Frontend code for handling donation deletion
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit, FaPause, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donations?page=${page}`);
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
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 30; // Adjust this threshold as needed
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
        useAxiosSecure.delete(`http://localhost:5000/donation/${donation._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Assuming refetch is a function that reloads the donation data
              // You need to define refetch function or any other method to update donations after deletion
              // refetch();
              Swal.fire({
                title: "Deleted!",
                text: "The donation has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting donation:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the donation.",
              icon: "error",
            });
          });
      }
    });
  };
  

  // Other functions like handleEdit and handlePause remain unchanged

  return (
    <div className="overflow-auto max-h-screen">
      <h2 className="text-xl font-bold mb-4">All Donations: {donations.length}</h2>
      <div ref={tableRef} className="w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Picture</th>
              <th className="px-4 py-2">Max Donation</th>
              <th className="px-4 py-2">Last Date</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2"><img src={donation.petPicture} alt="Pet" className="w-20 h-20 object-cover" /></td>
                <td className="border px-4 py-2">{donation.maxDonation}</td>
                <td className="border px-4 py-2">{donation.lastDate}</td>
                <td className="border px-4 py-2">{donation.email}</td>
                <td className="border px-4 py-2">{new Date(donation.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2">
                  <button className="mr-2"><FaEdit /></button>
                  <button onClick={() => handleDeleteDonation(donation)} className="mr-2"><FaTrash /></button>
                  <button ><FaPause /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div>Loading more...</div>}
      {!hasMore && <div>No more data</div>}
    </div>
  );
};

export default AllDonation;

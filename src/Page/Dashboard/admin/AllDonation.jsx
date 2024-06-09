import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit, FaPause, FaTrash } from 'react-icons/fa';

const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donation?page=${page}`);
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
        axios.delete(`http://localhost:5000/donation/${donation._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setDonations((prevDonations) => prevDonations.filter(d => d._id !== donation._id));
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

  return (
    <div className="overflow-x-auto">
      <div className="max-h-screen px-4">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">All Donations: {donations.length}</h2> {/* Updated text color */}
        <div ref={tableRef} className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-2 sm:px-4">No</th>
                <th className="px-2 py-2 sm:px-4">Picture</th>
                <th className="px-2 py-2 sm:px-4">Max Donation</th> {/* Check data structure */}
                <th className="px-2 py-2 sm:px-4">Last Date</th> {/* Check data structure */}
                <th className="px-2 py-2 sm:px-4">Email</th>
                <th className="px-2 py-2 sm:px-4">Created At</th>
                <th className="px-2 py-2 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td className="border px-2 py-2 sm:px-4">{index + 1}</td>
                  <td className="border px-2                   py-2 sm:px-4"><img src={donation.petPicture} alt="Pet" className="w-16 h-16 sm:w-20 sm:h-20 object-cover" /></td>
                  <td className="border px-2 py-2 sm:px-4">{donation.maxDonation}</td> {/* Check data structure */}
                  <td className="border px-2 py-2 sm:px-4">{donation.lastDate}</td> {/* Check data structure */}
                  <td className="border px-2 py-2 sm:px-4">{donation.email}</td>
                  <td className="border px-2 py-2 sm:px-4">{new Date(donation.createdAt).toLocaleString()}</td>
                  <td className="border px-2 py-2 sm:px-4">
                    <button className="mr-2 text-purple-600 hover:text-purple-800"><FaEdit /></button> {/* Updated text color */}
                    <button onClick={() => handleDeleteDonation(donation)} className="mr-2 text-purple-600 hover:text-purple-800"><FaTrash /></button> {/* Updated text color */}
                    <button className="text-purple-600 hover:text-purple-800"><FaPause /></button> {/* Updated text color */}
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


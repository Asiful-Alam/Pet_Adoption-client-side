import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

const MyAdoptions = () => {
  const { user } = useContext(AuthContext);
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  useEffect(() => {
    fetchAdoptionRequests();
  }, [user]);

  const fetchAdoptionRequests = async () => {
    try {
      const response = await fetch(`https://full-project-server.vercel.app/adoption-requests?user=${user.email}`);
      const data = await response.json();
      setAdoptionRequests(data);
    } catch (error) {
      console.error("Error fetching adoption requests:", error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await axios.patch(`https://full-project-server.vercel.app/adoption-requests/${requestId}`, { status: "APPROVED" });
      fetchAdoptionRequests();
    } catch (error) {
      console.error("Error accepting adoption request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.patch(`https://full-project-server.vercel.app/adoption-requests/${requestId}`, { status: "REJECTED" });
      fetchAdoptionRequests();
    } catch (error) {
      console.error("Error rejecting adoption request:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">My Adoption Requests</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Pet Name</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequests.map((request) => (
              <tr key={request._id}>
                <td className="border px-4 py-2">{request.petName}</td>
                <td className="border px-4 py-2">{request.userName}</td>
                <td className="border px-4 py-2">{request.userEmail}</td>
                <td className="border px-4 py-2">{request.phone}</td>
                <td className="border px-4 py-2">{request.address}</td>
                <td className="border px-4 py-2">{request.status}</td>
               <div className="flex">
               <td className="border px-4 py-2 flex flex-wrap">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleAccept(request.petId)}>Accept</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleReject(request.petId)}>Reject</button>
                </td>
               </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAdoptions;

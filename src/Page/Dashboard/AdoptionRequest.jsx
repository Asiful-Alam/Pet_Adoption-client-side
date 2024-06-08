import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";

const AdoptionRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      console.log("Fetching adoption requests for:", user.email);
      axiosSecure
        .get(`/adoption/${user.email}`) // Assuming your backend API endpoint is /adoption/:email
        .then((response) => {
          console.log("Adoption requests data:", response.data);
          setAdoptionRequests(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching adoption requests:", error);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Adoption Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : adoptionRequests.length > 0 ? (
        <ul>
          {adoptionRequests.map((request) => (
            <li key={request._id} className="mb-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">{request.petName}</h2>
                <img
                  src={request.petImage}
                  alt={request.petName}
                  className="w-24 h-24 mb-2 rounded-full shadow-lg"
                />
                <p className="text-lg">
                  <strong>Address:</strong> {request.address}
                </p>
                <p className="text-lg">
                  <strong>Phone:</strong> {request.phone}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No adoption requests found.</p>
      )}
    </div>
  );
};

export default AdoptionRequest;

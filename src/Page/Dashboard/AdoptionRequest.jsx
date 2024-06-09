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
        .get(`/adoption/${user.email}`)
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
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Pet Name</th>
              <th className="px-4 py-2">Pet Image</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequests.map((request) => (
              <tr key={request._id}>
                <td className="border px-4 py-2">{request.petName}</td>
                <td className="border px-4 py-2">
                  <img
                    src={request.petImage}
                    alt={request.petName}
                    className="w-12 h-12 rounded-full shadow-lg"
                  />
                </td>
                <td className="border px-4 py-2">{request.address}</td>
                <td className="border px-4 py-2">{request.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No adoption requests found.</p>
      )}
    </div>
  );
};

export default AdoptionRequest;

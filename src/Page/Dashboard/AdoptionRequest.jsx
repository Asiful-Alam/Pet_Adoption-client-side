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

  const handleAdopted = async (id) => {
    // Handle logic for when a pet is adopted
    console.log("Pet with ID", id, "has been adopted.");
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto ">
      <h1 className="text-3xl font-bold mb-8">My Adoption Requests</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : adoptionRequests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2">Pet Name</th>
                <th className="px-4 py-2">Pet Image</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {adoptionRequests.map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="px-4 py-3">{request.petName}</td>
                  <td className="px-4 py-3">
                    <img
                      src={request.petImage}
                      alt={request.petName}
                      className="w-20 h-20 rounded-full shadow-lg"
                    />
                  </td>
                  <td className="px-4 py-3">{request.address}</td>
                  <td className="px-4 py-3">{request.phone}</td>
                  <td className="px-4 py-3">
                    {request.adopted ? (
                      <button
                        disabled
                        className="bg-gray-400 text-white py-1 px-4 rounded cursor-not-allowed"
                      >
                        Adopted
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAdopted(request._id)}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                      >
                        Adopt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No adoption requests found.</p>
      )}
    </div>
  );
};

export default AdoptionRequest;

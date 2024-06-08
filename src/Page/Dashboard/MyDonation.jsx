import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const MyDonations = () => {
  const { currentUser } = useAuth();
  const [donations, setDonations] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (currentUser?.email) {
      console.log("Fetching donations for:", currentUser.email);
      axiosSecure
        .get(`/donation/${currentUser.email}`)
        .then((response) => {
          console.log("Donations data:", response.data);
          setDonations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
        });
    }
  }, [currentUser, axiosSecure]);

  const handleRefund = (donationId) => {
    axiosSecure
      .post(`/refund/${donationId}`)
      .then((response) => {
        if (response.data.success) {
          setDonations(
            donations.filter((donation) => donation._id !== donationId)
          );
        }
      })
      .catch((error) => console.error("Error processing refund:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      {donations.length === 0 ? (
        <div className="text-center text-gray-500">No donations found</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Pet Image</th>
              <th className="py-2">Pet Name</th>
              <th className="py-2">Donated Amount</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td className="py-2">
                  <img
                    src={donation.petPicture}
                    alt={donation.petName}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="py-2">{donation.petName}</td>
                <td className="py-2">${donation.donatedAmount.toFixed(2)}</td>
                <td className="py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleRefund(donation._id)}
                  >
                    Ask for Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyDonations;

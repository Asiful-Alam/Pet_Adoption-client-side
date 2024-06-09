import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const MyDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        if (user?.email) {
          const response = await axiosSecure.get(`/userpayment/${user.email}`);
          setDonations(response.data);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [user, axiosSecure]);

  const handleRefund = async (donationId) => {
    try {
      const response = await axiosSecure.post(`/refund/${donationId}`);
      if (response.data.success) {
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation._id !== donationId)
        );
      }
    } catch (error) {
      console.error("Error processing refund:", error);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">My Donations</h2>
      {donations.length === 0 ? (
        <div>No donations found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Pet Name</th>
                <th className="px-4 py-2 text-left">Donated Amount</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{donation.createdAt}</td>
                  <td className="px-4 py-2">${donation.amount ? donation.amount.toFixed(2) : "N/A"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRefund(donation._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Ask for Refund
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonations;

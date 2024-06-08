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
          const response = await axiosSecure.get(`/donation/${user.email}`);
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
    <div>
      <h2>My Donations</h2>
      {donations.length === 0 ? (
        <div>No donations found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Donated Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.petName}</td>
                <td>${donation.donatedAmount.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRefund(donation._id)}>
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

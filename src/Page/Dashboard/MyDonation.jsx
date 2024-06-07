import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';


const MyDonation = () => {
    const axiosSecure = useAxiosSecure();
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchUserDonations = async () => {
            try {
                // Fetch user donations using axiosSecure
                const response = await axiosSecure.get(`/mycampaigns/${user.email}`); // Replace `user.email` with the actual user's email
                setDonations(response.data);
            } catch (error) {
                console.error('Error fetching user donations:', error);
            }
        };

        fetchUserDonations();
    }, [axiosSecure]);

    return (
        <div className="max-w-7xl mx-auto p-6 mt-10">
            <h1 className="text-3xl font-bold mb-6">My Donations ({donations.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((donation) => (
                    <div key={donation._id} className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">{donation.petName}</h2>
                        <p className="text-gray-700 mb-2">
                            <strong>Donated Amount:</strong> ${donation.donatedAmount || 0}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>Date:</strong> {new Date(donation.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyDonation;

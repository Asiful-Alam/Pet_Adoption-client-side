import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../Hook/useAxiosSecure';


const DonationDetails = () => {
    const { id } = useParams(); // Retrieve the campaign ID from the URL
    const axiosSecure = useAxiosSecure();
    const [campaign, setCampaign] = useState(null); // State to store campaign data
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                // Fetch campaign details using the ID
                const response = await axiosSecure.get(`/donations/${id}`);
                setCampaign(response.data); // Update campaign state with fetched data
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            } finally {
                setLoading(false); // Set loading state to false after fetching data
            }
        };

        fetchCampaignDetails(); // Call the fetch function when component mounts
    }, [axiosSecure, id]); // Dependencies: axiosSecure (custom hook), id (campaign ID)

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10">
            {loading ? (
                // Display loading message if data is being fetched
                <p className="text-center mt-4">Loading...</p>
            ) : campaign ? (
                // Display campaign details if data is available
                <>
                    <h1 className="text-3xl font-bold mb-6">{campaign.petName}</h1>
                    <img
                        src={campaign.petPicture}
                        alt={campaign.petName}
                        className="w-full h-96 object-cover rounded-lg mb-4"
                    />
                    <p className="text-gray-700 mb-2">
                        <strong>Max Donation:</strong> ${campaign.maxDonation}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Donated Amount:</strong> ${campaign.donatedAmount || 0}
                    </p>
                    <p className="text-gray-700 mb-4">{campaign.description}</p>
                    <div>
                        <button className='border-4'>Donate Now</button>
                    </div>
                </>
            ) : (
                // Display message if campaign data is not found
                <p className="text-center mt-4">Campaign not found</p>
            )}
        </div>
    );
};

export default DonationDetails;

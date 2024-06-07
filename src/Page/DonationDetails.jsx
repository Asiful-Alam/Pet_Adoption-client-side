import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../Hook/useAxiosSecure';

const DonationDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [donationAmount, setDonationAmount] = useState('');

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await axiosSecure.get(`/donation/${id}`);
                setCampaign(response.data);
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaignDetails();
    }, [axiosSecure, id]);

    const handleAmountChange = (e) => {
        setDonationAmount(e.target.value);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10">
            {loading ? (
                <p className="text-center mt-4">Loading...</p>
            ) : campaign ? (
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
                    <input
                        type="number"
                        placeholder="Enter donation amount"
                        value={donationAmount}
                        onChange={handleAmountChange}
                        className="border p-2 mb-4 w-full"
                    />
                    <Link to={`/payment?amount=${donationAmount}&id=${campaign._id}`}>
                        <button className="border-4">Donate Now</button>
                    </Link>
                </>
            ) : (
                <p className="text-center mt-4">Campaign not found</p>
            )}
        </div>
    );
};

export default DonationDetails;

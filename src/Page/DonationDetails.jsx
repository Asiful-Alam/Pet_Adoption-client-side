import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState("");
  const [isCampaignActive, setIsCampaignActive] = useState(true);


  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axiosSecure.get(`/donation/${id}`);
        setCampaign(response.data);
        // Check if the campaign's last date has passed
        const currentDate = new Date();
        const lastDate = new Date(response.data.lastDate);
        if (currentDate > lastDate) {
          setIsCampaignActive(false);
        }
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [axiosSecure, id]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Check if the campaign data is available
    if (campaign) {
      // Check if the entered amount is less than or equal to the max donation amount
      if (value <= campaign.maxDonation) {
        // Check if the entered amount is greater than or equal to 0
        if (value >= 0) {
          setDonationAmount(value);
        } else {
          // If the entered amount is negative, set it to 0
          setDonationAmount(0);
        }
      } else {
        // If the entered amount exceeds the max donation amount, set it to the max donation amount
        setDonationAmount(campaign.maxDonation);
      }
    }
  };
  

  return (
    <div className="max-w-3xl bg-teal-300 mx-auto p-6 mt-10">
      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : campaign ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={campaign.petPicture}
              alt={campaign.petName}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
              <h1 className="text-xl font-bold">{campaign.petName}</h1>
            </div>
          </div>
          <div className="p-4">
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
            {/* Display a message if the campaign is not active */}
            {!isCampaignActive && (
              <p className="text-red-500 mb-4">
                The donation date has expired.
              </p>
            )}
            {/* Disable the button if the campaign is not active */}
            {isCampaignActive ? (
              <Link to={`/payment?amount=${donationAmount}&id=${campaign._id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                  Donate Now
                </button>
              </Link>
            ) : (
              <button
                className="bg-gray-300 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                disabled
              >
                Donate Now
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center mt-4">Campaign not found</p>
      )}
    </div>
  );
};

export default DonationDetails;

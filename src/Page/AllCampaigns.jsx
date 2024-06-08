import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Navbar from "../Component/Navbar";
const AllCampaigns = () => {
  const axiosSecure = useAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axiosSecure.get(`/donation?page=${page}&limit=10`);
      if (response.data.length > 0) {
        setCampaigns((prev) => [...prev, ...response.data]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, page, hasMore, loading]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      )
        return;
      fetchCampaigns();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchCampaigns, loading]);

  return (
   <div>
   <div>
    <Navbar></Navbar>
   </div>
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-white text-center font-bold">All Campaigns ({campaigns.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={campaign.petPicture}
              alt={campaign.petName}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{campaign.petName}</h2>
              <p className="text-gray-700 mb-2">
                <strong>Max Donation:</strong> ${campaign.maxDonation}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Donated Amount:</strong> ${campaign.donatedAmount || 0}
              </p>
              <Link
                to={`/viewcampaigns/${campaign._id}`}
                className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {!hasMore && !loading && <p className="text-center mt-4 text-gray-800">No more campaigns</p>}
    </div>
   </div>
  );
};

export default AllCampaigns;

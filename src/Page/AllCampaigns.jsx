import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";

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
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">All Campaigns ({campaigns.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={campaign.petPicture}
              alt={campaign.petName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{campaign.petName}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Max Donation:</strong> ${campaign.maxDonation}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Donated Amount:</strong> ${campaign.donatedAmount || 0}
            </p>
            <Link
              to={`/viewcampaigns/${campaign._id}`}
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {!hasMore && !loading && <p className="text-center mt-4">No more campaigns</p>}
    </div>
  );
};

export default AllCampaigns;

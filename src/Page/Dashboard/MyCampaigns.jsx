import React, { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthContext } from "../../provider/AuthProvider";
import MyCampaignCard from "../Dashboard/MyCampaignCard";

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchMyCampaigns = async () => {
        try {
          const response = await fetch(`http://localhost:5000/mycampaigns/${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setCampaigns(data);
          } else {
            console.error('Failed to fetch campaigns');
          }
        } catch (error) {
          console.error('Error fetching user campaigns:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchMyCampaigns();
    } else {
      setLoading(false);
    }
  }, [user]);

  // If user is null, show a loading skeleton
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10">
        <h1 className="text-3xl font-bold mb-6"><Skeleton width={250} /></h1>
        <Skeleton count={5} height={40} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">My Campaigns</h1>
      {loading ? (
        <Skeleton count={5} height={40} />
      ) : campaigns.length > 0 ? (
        campaigns.map(campaign => (
          <MyCampaignCard key={campaign._id} campaign={campaign} />
        ))
      ) : (
        <p>No campaigns found.</p>
      )}
    </div>
  );
};

export default MyCampaigns;

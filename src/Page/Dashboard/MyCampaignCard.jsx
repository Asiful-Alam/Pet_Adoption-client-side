import React from 'react';

const MyCampaignCard = ({ campaign }) => {
  const totalprice=campaign.reduce((total,item)=>total+item.price,0);
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-bold mb-2">{campaign.petName}</h2>
      <img
        src={campaign.petPicture}
        alt={campaign.petName}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <p className="text-gray-700 mb-2">
        <strong>Max Donation:</strong> ${campaign.maxDonation}
      </p>
      <p className="text-gray-700 mb-4">{campaign.shortDescription}</p>
      {/* Add additional details or buttons as needed */}
    </div>
  );
};

export default MyCampaignCard;

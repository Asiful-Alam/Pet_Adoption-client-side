import React from 'react';

const MyCampaignCard = ({ campaign }) => {
  const { petName, petPicture, maxDonation, shortDescription } = campaign;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-bold mb-2">{petName}</h2>
      <img
        src={petPicture}
        alt={petName}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <p className="text-gray-700 mb-2">
        <strong>Max Donation:</strong> ${maxDonation}
      </p>
      <p className="text-gray-700 mb-4">{shortDescription}</p>
    </div>
  );
};

export default MyCampaignCard;

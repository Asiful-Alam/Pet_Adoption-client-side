import React, { useState } from 'react';
import Modal from 'react-modal';

const MyCampaignCard = ({ campaign }) => {
  const { _id, petName, petPicture, maxDonation, shortDescription } = campaign;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedMaxDonation, setUpdatedMaxDonation] = useState(maxDonation);
  const [updatedShortDescription, setUpdatedShortDescription] = useState(shortDescription);

  const handleUpdate = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleUpdateSubmit = async () => {
    // Send updated data to the backend and update the campaign in the database
    try {
      const response = await fetch(`http://localhost:5000/donation/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          maxDonation: updatedMaxDonation,
          shortDescription: updatedShortDescription,
        }),
      });

      if (response.ok) {
        // Update the campaign locally
        campaign.maxDonation = updatedMaxDonation;
        campaign.shortDescription = updatedShortDescription;
        setModalIsOpen(false);
      } else {
        console.error('Failed to update campaign');
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

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
      <button onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Update
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Update Campaign Modal"
      >
        <h2>Update Campaign</h2>
        <label>
          Max Donation:
          <input
            type="number"
            value={updatedMaxDonation}
            onChange={(e) => setUpdatedMaxDonation(e.target.value)}
          />
        </label>
        <label>
          Short Description:
          <input
            type="text"
            value={updatedShortDescription}
            onChange={(e) => setUpdatedShortDescription(e.target.value)}
          />
        </label>
        <button onClick={handleUpdateSubmit}>Submit</button>
        <button onClick={handleModalClose}>Cancel</button>
      </Modal>
    </div>
  );
};

export default MyCampaignCard;

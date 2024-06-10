import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const MyCampaignCard = ({ campaign }) => {
  const { _id, petName, petPicture, maxDonation, shortDescription } = campaign;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [donations, setDonations] = useState([]);
  const [isPaused, setIsPaused] = useState(campaign.isPaused);
  const [updatedMaxDonation, setUpdatedMaxDonation] = useState(maxDonation);
  const [updatedShortDescription, setUpdatedShortDescription] = useState(shortDescription);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`https://full-project-server.vercel.app/donation/${_id}/donators`);
        if (response.ok) {
          const data = await response.json();
          setDonations(data.donators);
        } else {
          console.error('Failed to fetch donators');
        }
      } catch (error) {
        console.error('Error fetching donators:', error);
      }
    };

    if (modalIsOpen) {
      fetchDonations();
    }
  }, [modalIsOpen, _id]);

  const handleUpdate = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(`https://full-project-server.vercel.app/donation/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          maxDonation: updatedMaxDonation,
          shortDescription: updatedShortDescription,
        }),
      });

      if (response.ok) {
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

  const handlePause = () => {
    setIsPaused(!isPaused);
    campaign.isPaused = !isPaused; // Update campaign state
  };

  const handleViewDonators = () => {
    setModalIsOpen(true);
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
      <button onClick={handlePause} className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 ml-2">
        {isPaused ? 'Unpause' : 'Pause'}
      </button>
      <button onClick={handleViewDonators} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 ml-2">
        View Donators
      </button>
      <Modal
    
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Update Campaign Modal"
      >
        <h2 className='mb-4'>Update Campaign</h2>
        <label className='mt-4'>
          Max Donation:
          <input
            type="number"
            value={updatedMaxDonation}
            onChange={(e) => setUpdatedMaxDonation(e.target.value)}
          />
        </label>
        <label className='ml-8'>
          Short Description:
          <input
          className='ml-4'
            type="text"
            value={updatedShortDescription}
            onChange={(e) => setUpdatedShortDescription(e.target.value)}
          />
        </label>
        <button onClick={handleUpdateSubmit} className='<button ml-4 type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">Default</button>'>Submit</button>
        <button onClick={handleModalClose} className='<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>'>Cancel</button>
      </Modal>
      {/* Modal to display donators */}
      <Modal
        isOpen={modalIsOpen && donations.length > 0} // Only open if donations exist
        onRequestClose={handleModalClose}
        contentLabel="Donators Modal"
      >
        <h2>Donators</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index}>
                <td>{donation.user}</td>
                <td>${donation.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleModalClose} className=''>Close</button>
      </Modal>
    </div>
  );
};

export default MyCampaignCard;

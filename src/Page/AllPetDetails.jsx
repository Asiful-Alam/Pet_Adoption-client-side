import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdoptionModal from "../Component/AdoptionModal"; // Import the modal component
import { useAuth } from "../provider/AuthProvider";

const AllPetDetails = () => {
  const { id } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth(); // Get the current user

  useEffect(() => {
    setLoading(true);
    fetch(`https://full-project-server.vercel.app/pets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPetDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAdoptClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAdoptionSubmit = (adoptionData) => {
    fetch("https://full-project-server.vercel.app/adoption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adoptionData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Adoption request submitted:", data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error submitting adoption request:", error);
      });
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : petDetails ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Pet Details</h1>
          <div className="flex flex-col items-center space-y-4">
            <img
              src={petDetails.photo}
              alt={petDetails.name}
              className="w-48 h-48 rounded-full shadow-lg"
            />
            <div className="text-lg">
              <p>
                <strong>Name:</strong> {petDetails.name}
              </p>
              <p>
                <strong>Age:</strong> {petDetails.age}
              </p>
              <p>
                <strong>Location:</strong> {petDetails.location}
              </p>
            </div>
            <button
              onClick={handleAdoptClick}
              className="py-2 px-6 text-sm font-medium text-white bg-deepPurple rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            > {/* Adjust button color to match your color scheme */}
              Adopt
            </button>
          </div>
          <AdoptionModal
            pet={petDetails}
            user={user} // Pass the current user to the modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleAdoptionSubmit}
          />
        </>
      ) : (
        <p>Pet not found</p>
      )}
    </div>
  );
};

export default AllPetDetails;

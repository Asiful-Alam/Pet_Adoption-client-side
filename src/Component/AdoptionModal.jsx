import React, { useState } from "react";

const AdoptionModal = ({ pet, user, isOpen, onClose, onSubmit }) => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.photo,
      userName: user.displayName || user.email,
      userEmail: user.email,
      phone,
      address,
    };

    onSubmit(adoptionData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-gradient-to-br from-deepPurple to-purple-600 p-4 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-4">Adopt {pet.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              User Name
            </label>
            <input
              type="text"
              value={user.displayName || user.email}
              disabled
              className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-800"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-sm font-medium bg-magenta rounded-lg hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-sm font-medium bg-magenta rounded-lg hover:bg-purple-400 :outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionModal;

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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Adopt {pet.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              value={user.displayName || user.email}
              disabled
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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

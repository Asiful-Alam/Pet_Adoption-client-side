import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdatePetModal = ({ isOpen, onClose, pet, onUpdate }) => {
  const [name, setName] = useState(pet.name);
  const [age, setAge] = useState(pet.age);
  const [shortDescription, setShortDescription] = useState(pet.shortDescription);
  const [category, setCategory] = useState(pet.category);
  const [location, setLocation] = useState(pet.location);

  useEffect(() => {
    setName(pet.name);
    setAge(pet.age);
    setShortDescription(pet.shortDescription);
    setCategory(pet.category);
    setLocation(pet.location);
  }, [pet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPet = {
      name,
      age,
      shortDescription,
      category,
      location,
    };

    try {
      await onUpdate(pet._id, updatedPet);
      Swal.fire({
        title: "Success",
        text: "Pet details updated successfully",
        icon: "success",
      });
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update pet details",
        icon: "error",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">Update Pet</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Age</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Short Description</label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePetModal;

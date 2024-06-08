import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import UpdatePetModal from "./UpdatePetModal";

const AllPetTable = () => {
  const axiosSecure = useAxiosSecure();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPets = async () => {
    try {
      const response = await axiosSecure.get("/pets");
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDeletePet = (pet) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/pets/${pet._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your pet has been deleted.",
                icon: "success",
              });
              fetchPets();
            }
          })
          .catch((error) => {
            console.error("Error deleting pet:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to delete pet. Please try again later.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleUpdatePet = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const handlePetUpdate = async (id, updatedPet) => {
    try {
      await axiosSecure.patch(`/pets/${id}`, updatedPet);
      fetchPets();
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  const handleStatusChange = async (pet, newStatus) => {
    try {
      const updatedPet = { ...pet, adopted: newStatus };
      await axiosSecure.patch(`/pets/${pet._id}`, updatedPet);
      fetchPets();
    } catch (error) {
      console.error("Error updating pet status:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">
              Short Description
            </th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Action Delete</th>
            <th className="border border-gray-300 px-4 py-2">Action Update</th>
            <th className="border border-gray-300 px-4 py-2">Action Status</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.age}</td>
              <td className="border border-gray-300 px-4 py-2">
                {pet.shortDescription}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {pet.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {pet.location}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeletePet(pet)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleUpdatePet(pet)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleStatusChange(pet, !pet.adopted)}
                  className={`text-white font-semibold py-2 px-2 rounded ${
                    pet.adopted
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-700"
                  }`}
                >
                  {pet.adopted ? "Adopted" : "Not"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <UpdatePetModal
          isOpen={isModalOpen}
          pet={selectedPet}
          onClose={handleModalClose}
          onUpdate={handlePetUpdate}
        />
      )}
    </div>
  );
};

export default AllPetTable;

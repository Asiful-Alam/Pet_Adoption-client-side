import React from 'react';

const MyListCard = ({ pet, onUpdate, onDelete, onStatusChange, serialNumber }) => {
  return (
    <tbody>
      <tr className="bg-white border-b border-gray-200">
        <td className="px-6 py-4">{serialNumber}</td>
        <td className="px-6 py-4">{pet.name}</td>
        <td className="px-6 py-4">{pet.category}</td>
        <td className="px-6 py-4">
          <img src={pet.image} alt={pet.name} className="h-12 w-12 object-cover rounded-full" />
        </td>
        <td className="px-6 py-4">{pet.adopted ? 'Adopted' : 'Not Adopted'}</td>
        <td className="px-6 py-4 flex justify-center space-x-2">
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={() => onUpdate(pet._id)}
          >
            Update
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
            onClick={() => onDelete(pet._id)}
          >
            Delete
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold text-white rounded-md focus:outline-none ${
              pet.adopted ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
            onClick={() => onStatusChange(pet._id, !pet.adopted)}
          >
            {pet.adopted ? 'Adopted' : 'Available'}
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default MyListCard;

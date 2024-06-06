import React from 'react';

const MyListCard = ({ pet, onUpdate, onDelete, onStatusChange }) => {
  return (
    <tr className="bg-white border-b border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{pet.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{pet.age}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{pet.category}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{pet.location}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{pet.shortDescription}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center space-x-2">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={() => onUpdate(pet._id)}
          >
            Update
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
            onClick={() => onDelete(pet._id)}
          >
            Delete
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none ${
              pet.adopted ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
            onClick={() => onStatusChange(pet._id, !pet.adopted)}
          >
            {pet.adopted ? 'Adopted' : 'Available'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyListCard;

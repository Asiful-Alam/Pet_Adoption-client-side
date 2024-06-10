import React from 'react';
import { Link } from 'react-router-dom';

const MyListCard = ({ pet, onUpdate, onDelete, onStatusChange, serialNumber }) => {

  return (
    <tr className="bg-white border-b border-gray-200">
      <td className="px-4 py-2 md:px-6 md:py-4">{serialNumber}</td>
      <td className="px-4 py-2 md:px-6 md:py-4">{pet.name}</td>
      <td className="px-4 py-2 md:px-6 md:py-4">{pet.category}</td>
      <td className="px-4 py-2 md:px-6 md:py-4">
        <img src={pet.image} alt={pet.name} className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full" />
      </td>
      <td className="px-4 py-2 md:px-6 md:py-4">{pet.adopted ? 'Adopted' : 'Not Adopted'}</td>
      <td className="px-4 py-2 flex justify-center md:justify-end md:px-6 md:py-4 space-x-2">
        <Link to={`/dashboard/updatemypet/${pet._id}`}>
          <button
            className="px-3 py-1 md:px-4 md:py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Update
          </button>
        </Link>
        <button
          className="px-3 py-1 md:px-4 md:py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          onClick={() => onDelete(pet._id)}
        >
          Delete
        </button>
        <button
          className={`px-3 py-1 md:px-4 md:py-2 text-sm font-semibold text-white rounded-md focus:outline-none ${
            pet.adopted ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
          onClick={() => onStatusChange(pet._id, !pet.adopted)}
        >
          {pet.adopted ? 'Adopted' : 'Available'}
        </button>
      </td>
    </tr>
  );
};

export default MyListCard;

import React from 'react';

const petHospitals = [
  {
    name: "Care For Paws Hospital",
    address: "Moneshwor Rd, House no : 68/3C, Jigatola Road, Dhaka 1209",
    phone: "555-123-4567",
    email: "contact@careforpaws.com",
    website: "http://www.careforpaws.com",
    description: "We provide comprehensive veterinary care and emergency services for your beloved pets.",
    image: "https://i.ibb.co/PQSpThx/adopt-me-pet-02032021.jpg"
  },
  {
    name: "Forever Friends Animal Hospital",
    address: "5678 Woof Road, Barktown, BK 98765",
    phone: "555-987-6543",
    email: "info@foreverfriends.com",
    website: "http://www.foreverfriends.com",
    description: "Our dedicated team ensures the best care for your furry friends. Visit us for a healthy pet life!",
    image: "https://example.com/image2.jpg"
  }
];

const PetHospitalCard = ({ hospital }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      <img className="w-full h-48 object-cover" src={hospital.image} alt={hospital.name} />
      <div className="px-6 py-4">
        <h1 className="font-bold text-2xl mb-2 text-gray-800">{hospital.name}</h1>
        <p className="text-gray-600 text-lg mb-4">Comprehensive Care for Your Pets</p>
        <p className="text-gray-700 text-base mb-4">{hospital.description}</p>
        <p className="text-gray-600 mb-2"><strong>Address:</strong> <a href={mapUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">Click Here</a></p>
        <p className="text-gray-600 mb-2"><strong>Phone:</strong> {hospital.phone}</p>
        <p className="text-gray-600 mb-2"><strong>Email:</strong> <a href={`mailto:${hospital.email}`} className="text-blue-500">{hospital.email}</a></p>
        <p className="text-gray-600 mb-2"><strong>Website:</strong> <a href={hospital.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{hospital.website}</a></p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-wrap justify-center bg-gray-100 min-h-screen p-4">
      {petHospitals.map((hospital, index) => (
        <PetHospitalCard key={index} hospital={hospital} />
      ))}
    </div>
  );
};

export default App;

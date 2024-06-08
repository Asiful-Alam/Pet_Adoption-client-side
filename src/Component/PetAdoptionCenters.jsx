import React from 'react';
import { DiCelluloid } from 'react-icons/di';

const petAdoptionCenters = [
  {
    name: "Care For Paws",
    address: "Moneshwor Rd, House no : 68/3C, Jigatola Road, Dhaka 1209",
    phone: "555-123-4567",
    email: "contact@happytails.com",
    website: "http://www.happytails.com",
    description: "We have a wide variety of pets looking for their forever homes. Come visit us!",
    image: "https://i.ibb.co/PQSpThx/adopt-me-pet-02032021.jpg"
  },
  {
    name: "Forever Friends Animal Rescue",
    address: "5678 Woof Road, Barktown, BK 98765",
    phone: "555-987-6543",
    email: "info@foreverfriends.com",
    website: "http://www.foreverfriends.com",
    description: "Dedicated to rescuing and rehoming animals in need. Join us and find your new best friend!",
    image: "https://i.ibb.co/PQSpThx/adopt-me-pet-02032021.jpg"
  },
  {
    name: "Paw Haven",
    address: "123 Meow Street, Cat City, CC 12345",
    phone: "555-234-5678",
    email: "contact@pawhaven.com",
    website: "http://www.pawhaven.com",
    description: "A loving place for abandoned and rescued cats. Find your purrfect companion here.",
    image: "https://i.ibb.co/PQSpThx/adopt-me-pet-02032021.jpg"
  },
  {
    name: "Doggy Delight",
    address: "789 Bark Blvd, Dogtown, DT 67890",
    phone: "555-345-6789",
    email: "info@doggydelight.com",
    website: "http://www.doggydelight.com",
    description: "Your one-stop center for adopting dogs of all breeds and ages. Come and meet your new best friend!",
    image: "https://i.ibb.co/PQSpThx/adopt-me-pet-02032021.jpg"
  },
  {
    name: "Rabbit Retreat",
    address: "101 Bunny Lane, Hoptown, HT 54321",
    phone: "555-456-7890",
    email: "contact@rabbitretreat.com",
    website: "http://www.rabbitretreat.com",
    description: "Specialized in rescuing and rehoming rabbits. Hop on over to find your fluffy friend!",
    image: "https://i.ibb.co/PQSpThx/adopt-me-pet-02032021.jpg"
  }
];

const PetAdoptionCard = ({ center }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`;

  return (

    
    <div>
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      <img className="w-full h-[350px] object-cover" src={center.image} alt={center.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{center.name}</div>
        <p className="text-gray-700 text-base mb-4">{center.description}</p>
        <p className="text-gray-600 mb-2"><strong>Address:</strong> <a href={mapUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">Click Here</a></p>
        <p className="text-gray-600 mb-2"><strong>Phone:</strong> {center.phone}</p>
        <p className="text-gray-600 mb-2"><strong>Email:</strong> <a href={`mailto:${center.email}`} className="text-blue-500">{center.email}</a></p>
        <p className="text-gray-600 mb-2"><strong>Website:</strong> <a href={center.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{center.website}</a></p>
      </div>
    </div>
    </div>

  );
};

const App = () => {
  return (
   <div>
    <h1>Pet Hospital</h1>
    <p>Here you </p>
     <div className="flex flex-wrap justify-center bg-gray-100 min-h-screen p-4">
        
        {petAdoptionCenters.map((center, index) => (
          <PetAdoptionCard key={index} center={center} />
        ))}
      </div>
   </div>
  );
};

export default App;

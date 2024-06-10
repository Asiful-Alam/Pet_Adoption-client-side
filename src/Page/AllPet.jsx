import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import PetCard from '../Component/PetCard';
import Navbar from '../Component/Navbar';

const AllPet = () => {
    const pets = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const unadoptedPets = pets.filter(pet => (!pet.adopted && pet.name.toLowerCase().includes(searchTerm.toLowerCase())) && (!selectedCategory || pet.category === selectedCategory));

    // Function to handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Get unique categories from pets data
    const categories = Array.from(new Set(pets.map(pet => pet.category)));

    return (
        <div className="p-4 overflow-x-auto max-w-full bg-lightGray"> {/* Set background color to Light Gray */}
            <Navbar />
            <div className="max-w-screen-md mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4 text-deepPurple">All Pets ({unadoptedPets.length})</h1> {/* Set text color to Deep Purple */}
                    {/* Search input */}
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search by pet name"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {/* Category filter dropdown */}
                    <select
                        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCategory}
                        onChange={e => handleCategoryChange(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                {/* Pet cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {unadoptedPets.map(pet => (
                        <PetCard key={pet._id} pet={pet} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllPet;

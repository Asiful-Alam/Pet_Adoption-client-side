import React from "react";

const CallToActionSection = () => {
  return (
    <section className="bg-purple-gradient py-16">
      <div className="container mx-auto px-4 ">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Change a Life, Adopt a Pet</h2>
        <p className="text-lg text-center text-white mb-12">
          Transform a pet's life and enrich your own. Join us in our mission to provide loving homes for pets in need.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
          <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md border border-magenta">
            <img
              src="src/assets/dog for project.jpg"
              alt="Pet Adoption"
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Find Your Perfect Companion</h3>
            <p className="text-gray-700 text-center">
              Explore our diverse range of pets waiting to find their forever homes.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md border border-magenta">
            <img
              src="src/assets/dog for project.jpg"
              alt="Happy Pet"
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Make a Lasting Impact</h3>
            <p className="text-gray-700 text-center">
              By adopting, you're not just saving a life, you're changing it forever.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md border border-magenta">
            <img
              src="src/assets/dog for project.jpg"
              alt="Loving Home"
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Experience Unconditional Love</h3>
            <p className="text-gray-700 text-center">
              Open your heart and home to a furry friend and experience pure joy and companionship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;

import React from 'react';

const AboutUsSection = () => {
  return (
    <section className="bg-purple-gradient px-4 py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-white">About Pet Adoption</h2>
        <p className="text-white text-xl mb-8">
          Give a loving home to a deserving companion.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="order-2 md:order-1">
            <img
              src="src/assets/dog for project.jpg" // Replace with your image path
              alt="Happy dog and cat cuddling"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-white mb-4">
              Pet adoption is a rewarding experience for both you and the
              animal. You'll open your heart and home to a loving companion,
              and in return, you'll be greeted with unconditional love,
              loyalty, and joy.
            </p>
            <ul className="list-disc space-y-2 text-white">
              <li className="flex items-center">
                <i className="fas fa-heart mr-2 text-white"></i> Save a
                Life: Every pet adopted means one less animal euthanized due
                to overcrowding.
              </li>
              <li className="flex items-center">
                <i className="fas fa-paw mr-2 text-white"></i> Find a
                Perfect Match: Shelters and rescues have a wide variety of
                personalities, ages, and breeds to choose from.
              </li>
              <li className="flex items-center">
                <i className="fas fa-money-bill-alt mr-2 text-white"></i>
                Save Money: Adoption fees are typically much lower than the
                cost of buying a pet from a breeder.
              </li>
              <li className="flex items-center">
                <i className="fas fa-heart mr-2 text-white"></i> Give Love,
                Receive Love: Pets bring us companionship, reduce stress, and
                provide unconditional love.
              </li>
            </ul>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-deepPurple text-white font-bold rounded-lg hover:bg-lightPurple"
            >
              Find Your Perfect Pet Today!
              <svg
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

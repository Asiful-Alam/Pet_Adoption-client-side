import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-teal-500 border-b border-teal-600 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-2"
            alt="Flowbite Logo"
          />
          <span className="text-lg font-semibold text-gray-200">Pet Adoption</span>
        </div>

        <div className="flex items-center">
          <button
            className="block md:hidden text-gray-200 focus:outline-none"
            onClick={toggleDropdown}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18a1 1 0 110 2H3a1 1 0 110-2zm0 7h18a1 1 0 110 2H3a1 1 0 110-2zm0 7h18a1 1 0 110 2H3a1 1 0 110-2z"
              />
            </svg>
          </button>
          <div
            className={`${
              isDropdownOpen ? "block" : "hidden"
            } md:block md:w-auto md:ml-4`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-4 md:items-center">
              <li>
                <Link
                  to="/"
                  className="text-gray-200 hover:text-white block px-2 py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/category"
                  className="text-gray-200 hover:text-white block px-2 py-1"
                >
                  Pet Listing
                </Link>
              </li>
              <li>
                <Link
                  to="/campaigns"
                  className="text-gray-200 hover:text-white block px-2 py-1"
                >
                  Donation Campaigns
                </Link>
              </li>
              
              <li>
                <Link
                  to="/category"
                  className="text-gray-200 hover:text-white block px-2 py-1"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  to="/allpets"
                  className="text-gray-200 hover:text-white block px-2 py-1"
                >
                  All Pets
                </Link>
              </li>
              {user ? (
                <>
                  <li className="relative">
                    <button
                      type="button"
                      className="text-gray-200 focus:outline-none"
                      id="user-menu-button"
                      aria-expanded={isDropdownOpen}
                      onClick={toggleDropdown}
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.photoURL}
                        alt={user.displayName}
                      />
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 rounded-full w-3 h-3"></span>
                    </button>
                    <div
                      className={`${
                        isDropdownOpen ? "block" : "hidden"
                      } absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md z-10`}
                    >
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/earnings"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Earnings
                        </Link>
                        <button
                          onClick={handleLogOut}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="text-gray-200 hover:text-white block px-2 py-1"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

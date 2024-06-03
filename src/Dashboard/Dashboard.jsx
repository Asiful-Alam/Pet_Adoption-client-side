import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 min-h-full bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <ul className="menu">
            <li className="mb-2">
              <NavLink
                to="/"
                className="block py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
               Home
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/dashboard/pets"
                className="block py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Add Pet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myaddpet"
                className="block py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                My Added Pet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/adoptionreq"
                className="block py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Adoption Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/createCampaigns"
                className="block py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Create Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/mycampaigns"
                className="block py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
            My Donation Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/mydonation"
                className="block py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
             My Donation
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 bg-gray-200 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

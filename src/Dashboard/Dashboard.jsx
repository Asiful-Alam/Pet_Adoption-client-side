import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full  md:w-96 min-h-full md:min-h-screen lg:min-h-screen bg-teal-600 text-white">
        <div className="p-4 ">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <ul className="menu">
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/allusers"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    All User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allpets"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    All Pet
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/alldonation"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    All Donation
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="mb-2">
                  <NavLink
                    to="/dashboard/pets"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    Add Pet
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myaddpet"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    My Added Pet
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/adoptionreq"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    Adoption Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/adoptionbyuser"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    Adoption Request By User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/createCampaigns"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    Create Donation Campaign
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/mycampaigns"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    My Donation Campaigns
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/mydonation"
                    className="block py-2 px-4 rounded hover:bg-teal-700"
                    activeClassName="bg-teal-700"
                  >
                    My Donation
                  </NavLink>
                </li>
              </>
            )}
            <hr />
            <li className="mb-2">
              <NavLink
                to="/"
                className="block py-2 px-4 rounded hover:bg-teal-700"
                activeClassName="bg-teal-700"
              >
                Home
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

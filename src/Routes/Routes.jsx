import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Page/Home";
import CategoryPage from "../Page/CategoryPage";
import Login from "../Page/Login";
import Signup from "../Page/Signup";
import Secret from "../Component/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import AddPet from "../Page/Dashboard/AddPet";
import Error from "../Page/Error";
import AllPet from "../Page/AllPet";
import MyList from "../Page/Dashboard/MyList";
import CreateDonation from "../Page/Dashboard/CreateDonation";

import AllUsers from "../Page/Dashboard/AllUsers";
import AllPetAdmin from "../Page/Dashboard/admin/AllPetAdmin";
import AllCampaigns from "../Page/AllCampaigns";
import DonationDetails from "../Page/DonationDetails";
import MyCampaigns from "../Page/Dashboard/MyCampaigns";
import AllDonation from "../Page/Dashboard/admin/AllDonation";
import Payment from "../Component/Payment";
import MyDonation from "../Page/Dashboard/MyDonation";
import AllPetDetails from "../Page/AllPetDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/login", // Fixed the missing slash
        element: <Login></Login>,
      },
      {
        path: "/signup", // Fixed the missing slash
        element: <Signup></Signup>,
      },
      {
        path: "/allpets", // Fixed the missing slash
        element: <AllPet></AllPet>,
        loader: () => fetch("http://localhost:5000/pets"),
      },
      {
        path: "/allpetdetails/:id", // Correct parameter name
        element: <AllPetDetails />,
        loader: () => fetch("http://localhost:5000/pets"),
    },
      {
        path: "/secret", // Fixed the missing slash
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
      {
        path: "/campaigns", // Fixed the missing slash
        element: <AllCampaigns></AllCampaigns>,
      },
      {
        path: "/viewcampaigns/:id", // Fixed the missing slash
        element: <DonationDetails></DonationDetails>,
      },
      {
        path: "/mycampaigns/:email", // Fixed the missing slash and added the parameter
        element: <MyCampaigns></MyCampaigns>,
      },
      {
        path: "/payment", // Fixed the missing slash and added the parameter
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/dashboard", // Fixed the missing slash
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/pets", // Fixed the missing slash
        element: <AddPet></AddPet>,
      },
      {
        path: "/dashboard/myaddpet", // Fixed the missing slash
        element: <MyList></MyList>,
      },
      {
        path: "/dashboard/createCampaigns", // Fixed the missing slash
        element: <CreateDonation></CreateDonation>,
      },
      {
        path: "/dashboard/mycampaigns", // Fixed the missing slash
        element: <MyCampaigns></MyCampaigns>,
      },
      {
        path: "/dashboard/mydonation", // Fixed the missing slash
        element: <MyDonation></MyDonation>
      },
      {
        path: "/dashboard/allusers", // Fixed the missing slash
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/allpets", // Fixed the missing slash
        element: <AllPetAdmin></AllPetAdmin>,
        loader: () => fetch("http://localhost:5000/pets"),
      },
      {
        path: "/dashboard/alldonation", // Fixed the missing slash
        element: <AllDonation></AllDonation>,
      },
    ],
  },
]);

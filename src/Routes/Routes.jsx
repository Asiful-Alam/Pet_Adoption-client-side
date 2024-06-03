
import {
    createBrowserRouter,
  } from "react-router-dom";
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




export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children: [
        {
            path: "/",
            element:<Home></Home>,
           
        },
        {
          path: "/category",
          element:<CategoryPage></CategoryPage>
        },
        {
          path:'login',
          element:<Login></Login>
        },
        {
          path:'signup',
          element:<Signup></Signup>
        },
        {
          path:'allpets',
          element:<AllPet></AllPet>,
          loader:() => fetch('http://localhost:5000/pets')
        },
        {
          path:'secret',
          element:<PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        }
      ]
    },
    {
      path: "dashboard",
      element: <Dashboard></Dashboard>,
      children:[
        {
          path:"/dashboard/pets",
          element:<AddPet></AddPet>
        },
        {
          path:"/dashboard/myaddpet",
          element:<MyList></MyList>
        }
      ]
    }
  ]);
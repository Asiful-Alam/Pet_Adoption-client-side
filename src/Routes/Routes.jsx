
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



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path: "/",
            element:<Home></Home>
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
          path:'secret',
          element:<PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        }
      ]
    },
  ]);
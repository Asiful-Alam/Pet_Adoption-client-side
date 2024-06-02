
import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Page/Home";

import CategoryPage from "../Page/CategoryPage";



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
      ]
    },
  ]);
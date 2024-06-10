import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../Component/Navbar";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Use the useLocation hook to get the current location
  const location = useLocation();
  // Parse the query parameter to get the selected category
  const params = new URLSearchParams(location.search);
  const selectedCategoryFromQuery = params.get("category");

  useEffect(() => {
    fetch("category.json") // Assuming data comes from a JSON file
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    setSelectedCategory(selectedCategoryFromQuery); // Set the selected category from query parameter
  }, [selectedCategoryFromQuery]);

  return (
    <div>
      <Navbar />
      <Helmet>
        <title>Pet Category</title>
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold mb-8">Pet Category Page</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          {data
            .filter((item) => !selectedCategory || item.category === selectedCategory)
            .map((item) => (
              <div key={item._id}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img className="rounded-t-lg" src={item.pet_image} alt="" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <span className="text-2xl font-bold text-magenta">Category: </span>
                        {item.category}
                      </h5>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <span className="text-2xl font-bold text-magenta">Pet Name: </span>
                        {item.pet_name}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <span className="text-2xl font-bold text-magenta">Pet Age: </span>
                      {item.pet_age}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Component/Navbar";

const CategoryPage = () => {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <Navbar></Navbar>
      <Helmet>
        <title>Pet Category</title>
      </Helmet>
      <h1>Pet Category Page</h1>
      {/* Remove the filter selection as it's not needed for displaying all data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item._id}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="rounded-t-lg" src={item.pet_image} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.category}</h5>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.pet_name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.pet_age}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

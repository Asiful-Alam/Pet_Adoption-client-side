import { useEffect, useState } from "react";
import CategoryCard from "../Card/CategoryCard";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("category.json")
      .then((res) => res.json())
      .then((data) => {
        // Slice the first five items from the data array
        const firstFiveItems = data.slice(0, 5);
        setCategory(firstFiveItems);
      });
  }, []);

  return (
    <div className=" bg-purple-gradient text-white min-h-screen py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Pet Categories</h1>
        <p className="text-lg mb-8 font-semibold">Explore our wide range of pet categories below</p>
        <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {category.map((item) => (
            <CategoryCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;

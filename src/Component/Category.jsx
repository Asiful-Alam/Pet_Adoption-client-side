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
    <div className="bg-lightPurple text-white p-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Pet Category</h1>
        <p className="text-lg mb-8 text-center font-bold">Explore our wide range of pet categories below</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-lightGray">
          {category.map((item) => (
            <CategoryCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;

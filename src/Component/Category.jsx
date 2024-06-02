import { useEffect, useState } from "react";
import CategoryCard from "../Card/CategoryCard";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("category.json")
      .then((res) => res.json())
      .then((data) => {
        // Slice the first two items from the data array
        const firstTwoItems = data.slice(0, 5);
        setCategory(firstTwoItems);
      });
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-orange-500 text-center">Pet Category</h1>
        <p className="text-blue-500 text-center">dsaffffdfsfsdfsddfsdsfsdf</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {category.map((item) => (
          <CategoryCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Category;

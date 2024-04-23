import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./nav"; 

export default function Recipes() {
  const recipes = [
    {
      id: 1,
      imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      title: "Classic Italian Pasta",
      description: "Delicious Italian pasta with a rich tomato sauce, fresh herbs, and a sprinkle of Parmesan.",
    },
    {
      id: 2,
      imageUrl: "https://images.pexels.com/photos/853006/pexels-photo-853006.jpeg",
      title: "Cheesy Pepperoni Pizza",
      description: "Cheesy pizza topped with pepperoni and baked to perfection. A classic favorite!",
    },
    {
      id: 3,
      imageUrl: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
      title: "Vegetable Stir Fry",
      description: "A healthy mix of stir-fried vegetables served with steamed rice or noodles.",
    },
    {
      id: 4,
      imageUrl: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
      title: "Beef Steak",
      description: "Juicy grilled steak served with garlic butter and a side of roasted potatoes.",
    },
  ];

  let navigate = useNavigate();

  function handleClick(id) {
    navigate(`/recipe/${id}`);
  }

  return (
    <div>
      <Navbar /> 
      <div className="flex flex-col items-center mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-10">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="cursor-pointer p-4 border border-gray-300 shadow-md rounded-lg"
              onClick={() => handleClick(recipe.id)}
            >
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg sm:text-xl font-semibold mt-2">{recipe.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{recipe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

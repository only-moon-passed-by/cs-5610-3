import React from "react";
import { useNavigate } from "react-router-dom";

const ContentBox = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-200 p-4 gap-5 pt-60 pb-40 md:gap-20 md:flex-nowrap">
      {categories.map((category) => (
        <div
          key={category.id}
          style={{
            width: "90vw",
            height: "40vh",
            borderRadius: "3rem",
            backgroundImage: `url(${category.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
          onClick={() => handleNavigate(category.path)}
          className="md:w-80 md:h-160 mb-4 md:mb-0 flex items-center justify-center cursor-pointer"
        >
          <div style={overlayStyle}></div>
          <div className="p-4 text-white z-10 relative text-2xl md:text-4xl text-center">
            {category.name}
          </div>
        </div>
      ))}
    </div>
  );
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "3rem", 
};

export default ContentBox;

const categories = [
  {
    id: 1,
    name: "Asian Food",
    image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    path: "/asianrecipes"
  },
  {
    id: 2,
    name: "Western Food",
    image: "https://images.pexels.com/photos/19037599/pexels-photo-19037599.jpeg?auto=compress&cs=tinysrgb&w=600",
    path: "/westernrecipes"
  },
  {
    id: 3,
    name: "Fitness Meal",
    image: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=600",
    path: "/fitnessrecipes"
  },
  {
    id: 4,
    name: "Awesome Drinks",
    image: "https://images.pexels.com/photos/1459338/pexels-photo-1459338.jpeg?auto=compress&cs=tinysrgb&w=600",
    path: "/drinkrecipes"
  }
];

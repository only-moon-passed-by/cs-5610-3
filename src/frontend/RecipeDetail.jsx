import React, { useEffect, useState } from 'react';
import Navbar from './nav';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    imageUrl: "",
    ingredients: []
  });

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const fetchRecipe = async () => {
    if (id > 0) {
      try {
        const response = await fetch(`http://localhost:8000/recipe/${id}`, {
          method: 'GET'
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Recipe fetched:', data);

          const returnData = {
            title: data.name ? data.name : '',
            description: data.description ? data.description : '',
            imageUrl: data.imageUrl ? data.imageUrl : '',
            ingredients: data.ingredients ? data.ingredients.split(',') : []
          };

          setRecipe(returnData);
        } else {
          throw new Error('Failed to fetch recipe');
        }
      } catch (error) {
        console.error('Error fetch recipe:', error.message);
      }
    }
  }

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="max-w-8xl mx-auto p-8 bg-white shadow-xl rounded-lg pt-20">
        <div className="flex flex-col md:flex-row">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full md:w-1/2 h-auto rounded-lg"
          />
          <div className="flex flex-col justify-between p-4 md:pl-10 lg:pl-40">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold">{recipe.title}</h2>
              <p className="text-gray-700 mt-2">{recipe.description}</p>
              <h3 className="font-semibold mt-4 mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={toggleLike}
              className={`mb-20 self-end ${liked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 lg:h-20 lg:w-20" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;

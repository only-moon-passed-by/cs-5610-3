import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './nav';  
import categoryData from '../categoryData';

export default function FitnessRecipes() {
    const [recipes, setRecipes] = useState([]);
    let navigate = useNavigate();

    function handleClick(id) {
        navigate(`/recipe/${id}`);
    }

    const getIdByRouteName = (routeName) => {
        const item = categoryData.find(item => item.routeName === routeName);
        return item ? item.id : null;
    }

    const CategoryId = getIdByRouteName('fitnessrecipes');

    const fetchRecipesByCategory = async () => {
        try {
            if(CategoryId > 0){
                const response = await fetch(`http://localhost:8000/recipes/category/id/${CategoryId}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    const data = await response.json();
                    const returnData = [];
                    console.log('Recipe fetched:', data);
                    if(data && data.length > 0){
                        data.forEach((item) => {
                            if(item.id > 0){
                                returnData.push({
                                    id: item.id,
                                    imageUrl: item.imageUrl ? item.imageUrl : '',
                                    title: item.name ? item.name : '',
                                    description: item.description ? item.description : '',
                                })
                            }
                        })
                    }
                    setRecipes(returnData)
                } else {
                    throw new Error('Failed to fetch recipe');
                }
            }
        } catch (error) {
            console.error('Error fetch recipe:', error.message);
        }
    }

    useEffect(() => {
        fetchRecipesByCategory();
    }, []);

    return (
        <div>
            <Navbar />  
            <div className="flex flex-col items-center mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-10">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="cursor-pointer p-4 border border-gray-300 shadow-md rounded-lg" onClick={() => handleClick(recipe.id)}>
                            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover rounded-lg" />
                            <h3 className="text-lg sm:text-xl font-semibold mt-2">{recipe.title}</h3>
                            <p className="text-gray-600 text-sm sm:text-base">{recipe.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

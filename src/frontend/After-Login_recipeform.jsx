import React, { useState } from 'react';
import Navbar from './nav';
import categories from '../categoryData';

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [''],
    image: null,
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    setRecipe({ ...recipe, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('description', recipe.description);
    formData.append('ingredients', recipe.ingredients.join(','));
    formData.append('category', recipe.category);
    if (recipe.image) {
      formData.append('image', recipe.image);
    }

    try {
      const response = await fetch('http://localhost:8000/recipes', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Recipe created:', data);
        setRecipe({
          name: '',
          description: '',
          ingredients: [''],
          image: null,
          category: ''
        });
      } else {
        throw new Error('Failed to create recipe');
      }
    } catch (error) {
      console.error('Error submitting recipe:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg pt-20 sm:p-2 overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Recipe Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter recipe name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={recipe.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Describe the recipe"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mt-1">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Ingredient"
                />
                {index === recipe.ingredients.length - 1 && (
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="ml-2 px-3 py-1 text-sm text-white bg-blue-500 rounded-md"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Recipe Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <div className="mt-2 space-y-2">
              {categories.map(category => (
                <label key={category.id} className="inline-flex items-center pl-10 pt-4">
                  <input
                    type="radio"
                    checked={parseInt(recipe.category) === parseInt(category.id)}
                    onChange={handleCategoryChange}
                    value={category.id}
                    name="category"
                    className="form-radio"
                  />
                  <span className="ml-2">{category.title}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg">Submit Recipe</button>
        </form>
      </div>
    </>
  );
};

export default RecipeForm;

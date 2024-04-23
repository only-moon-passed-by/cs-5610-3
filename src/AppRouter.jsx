import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './frontend/HeroPage'; 
import Recipes from './frontend/RecipePage'; 
import WesternRecipes from './frontend/WesternFood';
import FitnessRecipes from './frontend/Fitnessmeal';
import AsianRecipes from './frontend/AsianFood';
import DrinkRecipe from './frontend/Drinkrecipe';
import RecipeForm from './frontend/After-Login_recipeform';
import RecipeDetail from './frontend/RecipeDetail';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroPage />} /> 
        <Route path="/recipes" element={<Recipes />} /> 
        <Route path="/asianrecipes" element={<AsianRecipes />} /> 
        <Route path="/westernrecipes" element={<WesternRecipes />} /> 
        <Route path="/fitnessrecipes" element={<FitnessRecipes />} /> 
        <Route path="/drinkrecipes" element={< DrinkRecipe/>} />
  
        <Route path='/After-Login_recipeform' element={<RecipeForm/>}/>
        <Route path='/recipe/:id' element={<RecipeDetail/>}/>

        
      </Routes>
    </Router>
  );
}

export default AppRouter;

import React, { useCallback, useEffect, useState } from 'react';
import { getRecipes, deleteRecipeById, recipeDownloadPath } from '../services/api';
import RecipeCard from './RecipeCard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RecipeFilters from './RecipesFilters';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [nameFilter, setNameFilter] = useState(false);
  const [dateEditedFilter, setDateEditedFilter] = useState(false);

  const recipeRemover = id => async () => {
    await deleteRecipeById(id);
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  const fetchRecipes = useCallback(async () => {
    const data = await getRecipes({ nameFilter, dateEditedFilter });
    setRecipes(data);
  }, [nameFilter, dateEditedFilter]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes, nameFilter, dateEditedFilter]);

  return (
    <div>
      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <RecipeFilters
              name={nameFilter}
              dateEdited={dateEditedFilter}
              onNameChange={setNameFilter}
              onDateEditedChange={setDateEditedFilter}
            />
          </Grid>

          <Grid item xs={2}>
            <Link to={`/new`} style={{ textDecoration: 'none' }} ml={10}>
              <Button type="button" variant="contained">
                New Recipe
              </Button>
            </Link>  
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} mt={5}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {recipes.map((recipe, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <RecipeCard
                recipe={recipe}
                key={recipe.id}
                remove={recipeRemover(recipe.id)}
                downloadPath={recipeDownloadPath(recipe.id)} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default RecipeList;

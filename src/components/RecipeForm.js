import React, { useState, useEffect, useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, Link } from 'react-router-dom';

import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { createRecipe, updateRecipe, getRecipeById, recipeDownloadPath } from '../services/api';

const RecipeForm = ({ formType }) => {
  const { id: paramId } = useParams();

  const blankRecipeState = {
    id: paramId || '',
    name: '',
    image_path: '',
    cook_time_in_seconds: 0,
    prep_time_in_seconds: 0,
    prep_time_unit: 1,
    cook_time_unit: 1,
    instructions: [],
    ingredients: [],
  }

  const [recipe, setRecipe] = useState(blankRecipeState);

  const fetchRecipe = useCallback(async () => {
    if (!paramId) { return }

    const data = await getRecipeById(paramId);
    setRecipe({
      ...data,
      prep_time_unit: 1,
      cook_time_unit: 1
    });
  }, [paramId]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      prep_time_in_seconds,
      cook_time_in_seconds,
      prep_time_unit,
      cook_time_unit,
      instructions,
      ingredients
    } = recipe

    const payload = {
      ...recipe,
      prep_time_in_seconds: prep_time_in_seconds * prep_time_unit,
      cook_time_in_seconds: cook_time_in_seconds * cook_time_unit,
      instructions_attributes: instructions,
      ingredients_attributes: ingredients
    }

    if (formType === 'edit') {
      await updateRecipe(paramId, payload);
    } else {
      await createRecipe(payload);
    }

    navigate('/')
  };

  const handleInstructionChange = (e, index) => {
    const { value } = e.target;
    setRecipe((prevRecipe) => {
      const newInstructions = [...(prevRecipe.instructions || [])];
      newInstructions[index].content = value;
      return { ...prevRecipe, instructions: newInstructions };
    });
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => {
      const newIngredients = [...prevRecipe.ingredients];
      newIngredients[index][name] = value;
      return { ...prevRecipe, ingredients: newIngredients };
    });
  };

  const addInstruction = () => {
    setRecipe((prevRecipe) => {
      const newInstructions = [...(prevRecipe.instructions || [])];
      newInstructions.push({ id: null, content: '', _destroy: false });
      return { ...prevRecipe, instructions: newInstructions };
    });
  };

  const addIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [
        ...prevRecipe.ingredients,
        { id: null, item: '', quantity: 0, measurement_unit: '', _destroy: false },
      ],
    }));
  };

  const removeInstruction = (index) => {
    setRecipe((prevRecipe) => {
      const newInstructions = [...(prevRecipe.instructions || [])];
      newInstructions[index]._destroy = true;
      return { ...prevRecipe, instructions: newInstructions };
    });
  };

  const removeIngredient = (index) => {
    setRecipe((prevRecipe) => {
      const newIngredients = [...prevRecipe.ingredients];
      newIngredients[index]._destroy = true;
      return { ...prevRecipe, ingredients: newIngredients };
    });
  };

  return (
    <div>
      <Typography variant="h4" mt={5}>
        {formType === 'edit' ? 'Edit Recipe' : 'New Recipe'}
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipe Name"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image_path"
                value={recipe.image_path}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Preparation Time"
                name="prep_time_in_seconds"
                type="number"
                value={recipe.prep_time_in_seconds}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="prep-time-select-label">Time Unit</InputLabel>
                <Select
                  labelId="prep-time-select-label"
                  id="prep-time-select"
                  name='prep_time_unit'
                  value={recipe.prep_time_unit}
                  onChange={handleChange}
                  label="Cook Time"
                  required
                >
                  <MenuItem value={1}>Second(s)</MenuItem>
                  <MenuItem value={60}>Minute(s)</MenuItem>
                  <MenuItem value={60 * 60}>Hour(s)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Cook Time"
                name="cook_time_in_seconds"
                type="number"
                value={recipe.cook_time_in_seconds}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="cook-time-select-label">Time Unit</InputLabel>
                <Select
                  labelId="cook-time-select-label"
                  id="cook-time-select"
                  name='cook_time_unit'
                  value={recipe.cook_time_unit}
                  onChange={handleChange}
                  label="Cook Time"
                  required
                >
                  <MenuItem value={1}>Second(s)</MenuItem>
                  <MenuItem value={60}>Minute(s)</MenuItem>
                  <MenuItem value={60 * 60}>Hour(s)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {recipe.instructions && recipe.instructions.filter(e => !e._destroy).map((instruction, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <div xs={6}>
                    <TextField
                      fullWidth
                      label={`Instruction ${index + 1}`}
                      value={instruction.content}
                      onChange={(e) => handleInstructionChange(e, index)}
                      required
                    />
                  </div>
                  <div xs={6} >
                    <Button fullWidth type="button" onClick={() => removeInstruction(index)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </Grid>

            <Grid item xs={6} mb={3}>
              <Button type="button" onClick={addInstruction}>
                Add Instruction
              </Button>
            </Grid>

            {recipe.ingredients && recipe.ingredients.filter(e => !e._destroy).map((ingredient, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <TextField
                  label="Ingredient"
                  name="item"
                  value={ingredient.item}
                  onChange={(e) => handleIngredientChange(e, index)}
                  required
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(e, index)}
                  required
                />
                <TextField
                  label="Measurement Unit"
                  name="measurement_unit"
                  value={ingredient.measurement_unit}
                  onChange={(e) => handleIngredientChange(e, index)}
                  required
                />
                <Button type="button" onClick={() => removeIngredient(index)}>
                  Delete
                </Button>
              </div>
            ))}

            <Grid item xs={6} mb={3}>
              <Button type="button" onClick={addIngredient}>
                Add Ingredient
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Link to={`/`} style={{ textDecoration: 'none' }}>
                <Button type="button" variant="outline" color="secondary">
                  Back
                </Button>
              </Link>

              <Button type="submit" variant="contained" color="primary" mr={20}>
                {formType === 'edit' ? 'Update' : 'Create'}
              </Button>

              { formType === 'edit' && (
                <a download href={recipeDownloadPath(paramId)} rel='noreferrer' target='_blank'>
                  <Button aria-label="download" color="success" variant="contained" alt='Save as JSON-LD'>
                    Download as JSON-LD
                  </Button>
                </a>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default RecipeForm;

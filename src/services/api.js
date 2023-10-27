import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getRecipes = async ({ nameFilter, dateEditedFilter }) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`, {
      params: {
        ordered_by_name: nameFilter || null,
        ordered_by_date_edited: dateEditedFilter || null,
      },
    });
    return response.data || [];
  } catch (error) {
    throw error;
  }
};

export const createRecipe = async (recipe) => {
  try {
    const response = await axios.post(`${BASE_URL}/recipes`, recipe);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRecipe = async (id, recipe) => {
  try {
    const response = await axios.patch(`${BASE_URL}/recipes/${id}`, recipe);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRecipeById = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/recipes/${id}`);
    return {};
  } catch (error) {
    throw error;
  }
};

export const recipeDownloadPath = id => `${BASE_URL}/recipes/${id}/json_ld`

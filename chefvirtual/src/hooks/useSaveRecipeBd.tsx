// src/api/saveRecipe.js
import axios from 'axios';
import { RecipeData } from '../hooks/useRecipeData'; 

const API_URL = 'http://localhost:3000/create-recipe'; 

export const saveRecipe = async (recipeData: RecipeData) => { 


  console.log("save recipe aqui ") //adicionando para ver se a funçaõ está sendo chamada ---------------RETIRAR DEPOIS---------

  try {
    const response = await axios.post(API_URL, recipeData); //pega os dados da api , através do método POST e salva no response
    return response.data; //retorna os dados da receita 
  } catch (error) {
    console.error('Erro ao salvar a receita:', error);
    throw error;
  
  }
};


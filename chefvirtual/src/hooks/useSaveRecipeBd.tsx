import axios from "axios";
import { RecipeData } from "./useRecipeData";

const API_URL = "http://localhost:3000"; 

export const saveRecipe = async (recipeData: RecipeData) => {
  try {
    console.log("Description no frontend:", recipeData.description);

    const response = await axios.post(
      `${API_URL}/create-recipe`, 
      {
        title: recipeData.title,
        steps: recipeData.steps,
        author: recipeData.author,
        description: recipeData.description, // Enviando diretamente como objeto
      }, 
      {
        headers: { "Content-Type": "application/json" }, // Usando JSON
      }
    );
    console.log("Resposta da API:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao salvar a receita:", error.response?.data);
      console.error("Código de status:", error.response?.status);
    } else {
      console.error("Erro desconhecido:", error);
    }
  }
};

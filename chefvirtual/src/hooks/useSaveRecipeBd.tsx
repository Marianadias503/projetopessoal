import axios from "axios";
import { RecipeData } from "./useRecipeData";

const API_URL = "http://localhost:3000"; 

export const saveRecipe = async (recipeData: RecipeData) => {
  try {
    console.log("Description no frontend:", recipeData.description);

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("steps", recipeData.steps);
    formData.append("author", recipeData.author);
    formData.append("description", JSON.stringify(recipeData.description));

    if (recipeData.image_url) {
      const response = await fetch(recipeData.image_url);
      const blob = await response.blob();
      formData.append("file", blob, "image.jpg");
    }

    const response = await axios.post(`${API_URL}/create-recipe`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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

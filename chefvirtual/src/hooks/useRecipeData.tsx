import { useState } from "react";

// Interface para tipar os dados da receita
export interface RecipeData {
  title: string; // Nome da receita
  image_url: string | null; // Foto ou vídeo
  description: string[]; // Lista de ingredientes
  steps: string; // Modo de preparo
  author: string; // Autor
}

export const useRecipeData = () => {
  // Estado para armazenar os dados da receita usando o useState
  const [recipeData, setRecipeData] = useState<RecipeData>({
    title: "",
    image_url: null, 
    description: [""], // incia com um campo de ingrediente vazio
    steps: "", 
    author: "", 
  });

  // Função para atualizar os dados do formulário e deixar salvo no setRecipeData
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
  
    setRecipeData((prevData) => {
      if (name.startsWith("description") && index !== undefined) {
        // Atualiza um ingrediente específico
        const updatedIngredients = [...prevData.description];
        updatedIngredients[index] = value.trim();
        return { ...prevData, description: updatedIngredients };
      } else {
        // Atualiza os outros campos normalmente
        return { ...prevData, [name]: value };
      }
    });
  };
  
  // Retornar o estado e a função para atualização
  return { recipeData, handleInputChange, setRecipeData };
};

import { useState } from "react";

// Interface para tipar os dados da receita
export interface RecipeData {
  title: string; // Nome da receita
  file: File | null; // Foto ou vídeo
  description: string[]; // Lista de ingredientes
  steps: string; // Modo de preparo
  author: string; // Autor
}

export const useRecipeData = () => {
  // Estado para armazenar os dados da receita usando o useState
  const [recipeData, setRecipeData] = useState<RecipeData>({
    title: "",
    file: null, 
    description: [""], // incia com um campo de ingrediente vazio
    steps: "", 
    author: "", 
  });

  // Função para atualizar os dados do formulário e deixar salvo no setRecipeData
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
  
    if (name === "file" && files) {
      // Atualizar arquivo
      setRecipeData((prevData) => ({ ...prevData, file: files[0] }));
    } else if (name.startsWith("description") && index !== undefined) {
      // Atualizar ingrediente específico
      setRecipeData((prevData) => {
        const updatedIngredients = [...prevData.description];
        updatedIngredients[index] = value.trim();
        return { ...prevData, description: updatedIngredients };
      });
    } else {
      // Atualizar os outros campos
      setRecipeData((prevData) => ({
        ...prevData,
        [name]: name === 'description' ? value.trim() : value,
      }));
    }
  };
  

  // Retornar o estado e a função para atualização
  return { recipeData, handleInputChange, setRecipeData };
};

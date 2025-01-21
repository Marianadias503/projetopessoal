import { useState } from "react";

export const useRecipeData = () => {
  // Estado para armazenar os dados da receita
  const [recipeData, setRecipeData] = useState({
    name: "", // Nome da receita
    file: null as File | null, // Foto/vídeo
    ingredients: ["", "", ""], // Lista de ingredientes
    steps: "", // Modo de preparo
    author: "", // Autor da receita
  });

  // Função para atualizar os dados do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "file" && files) {
      // Atualizar arquivo
      setRecipeData((prevData) => ({ ...prevData, file: files[0] }));
    } else if (name === "ingredient" && index !== undefined) {
      // Atualizar ingrediente específico
      setRecipeData((prevData) => {
        const updatedIngredients = [...prevData.ingredients];
        updatedIngredients[index] = value;
        return { ...prevData, ingredients: updatedIngredients };
      });
    } else {
      // Atualizar outros campos
      setRecipeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Retornar o estado e a função para atualização
  return { recipeData, handleInputChange };
};

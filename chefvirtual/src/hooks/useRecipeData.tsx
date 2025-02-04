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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, // Indica que é um evento do React que pode vir de um Input ou TextArea
    index?: number // O index é usado para ajudar a identificar qual é o input que está sendo atualizado, ele é passado como parâmetro na minha div de ingredientes, é gerado pela função map quando percorre o meu array
  ) => {
    // Esses elementos serão passados pela verificação
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "file" && files) {
      // Atualizar arquivo
      setRecipeData((prevData) => ({ ...prevData, file: files[0] }));
    } 
    // Se for um campo de ingredientes e o index for fornecido, irá ter uma cópia do array dos ingredientes (prevData) atuais, 
    // depois irá pegar o ingrediente do índice fornecido, e passará a ser o novo valor no campo e será mostrado no return os ingredientes que já estavam juntamente com 
    // o novo ingrediente atualizado
    else if (name === "ingredient" && index !== undefined) {
      // Atualizar ingrediente específico
      setRecipeData((prevData) => {
        const updatedIngredients = [...prevData.description]; // faz uma cópia do array
        updatedIngredients[index] = value; // Atualiza o valor do ingrediente no índice fornecido
        return { ...prevData, description: updatedIngredients }; // Atualiza a chave 'description' no estado com o array convertido novamente em string
      });
    } else {
      // Atualizar os outros campos
      setRecipeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  

  // Retornar o estado e a função para atualização
  return { recipeData, handleInputChange, setRecipeData };
};

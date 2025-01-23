import { useState } from "react";

export const useRecipeData = () => {

  // Estado para armazenar os dados da receita usando o useState
  const [recipeData, setRecipeData] = useState({
    name: "", // Nome da receita
    file: null as File | null, // Foto/vídeo
    ingredients: ["", "", ""], // Lista de ingredientes
    steps: "", // Modo de preparo
    author: "", // Autor da receita
  });
  
  // Função para atualizar os dados do formulário e deixar salvo no setRecipeData
 
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,//indica que é um evento do react que pode vim de um Input ou TextArea
    index?: number // o index é usado para ajudar a identificar qual é o input que está sendo atualizado, ele é passado como parâmetro na minha div de ingredientes, é gerado pela função map quando percorre o meu array
  ) => {
    //esses elementos serão passados pela verificação
    const { name, value, files } = e.target as HTMLInputElement;
   
    if (name === "file" && files) {
      // Atualizar arquivo
      setRecipeData((prevData) => ({ ...prevData, file: files[0] }));
    } 
    
    //se for um campo de ingredientes e o index for fornecido, irá ter uma cópia do array dos ingredientes (prevData) atuais, 
    // depois irá pegar o ingrediente do indice fornecido, e passará a ser o novo valor no campo e será mostrado no return os ingredientes que já estavam juntamente com 
    //o novo ingrediente atualizado

    else if (name === "ingredient" && index !== undefined) {
      // Atualizar ingrediente específico
      setRecipeData((prevData) => {
        const updatedIngredients = [...prevData.ingredients];
        updatedIngredients[index] = value;
        return { ...prevData, ingredientsAtualizado: updatedIngredients };
      });
    } else {
      // Atualizar os outros campos
      setRecipeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Retornar o estado e a função para atualização
  return { recipeData, handleInputChange };
};

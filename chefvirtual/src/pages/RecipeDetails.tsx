import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

interface Recipe {
    id: number;
    title: string;
    description: string;
    image_url: string;
    ingredients: string[];
    instructions: string[];

  }
  

const RecipeDetails:React.FC=()=>{
    const { recipeId } = useParams<{ recipeId: string }>(); // o recipeId está sendo criado pelo useParams, e vai pegar o id da receita na url 
    const [recipe, setRecipe] = useState<Recipe | null> (null); //salva a receita, o recipe pode conter a receita ou ser null, é inicado como null

    //useEffect, pois quero que a atualização dos detalhesda receita seja feita sempre que o recipeId mudar
    useEffect(()=>{
        //fetch usado para realizar requisição HTTP (banco de dados )
        const fetchRecipeDetails = async () =>{
            try{
                //função que busca a receita do banco de dados
                //chama a função RecipeById para buscar o id da receita convertido em número inteiro 
                const recipeData = await getRecipeById(ParseInt(recipeId)); //ParseInt= converte a string recipeId para número inteiro 
                
                setRecipe(recipeData);//atualiza o setRecipe com o id atual convertido para número inteiro 

            } catch (error){
                console.log('Erro ao buscar a receita:', error); //retorna caso o try naõ seja concluido com sucesso 
            }
        };

        fetchRecipeDetails();

    },[recipeId]// o RecipeDetails é chamado sempre que o recipeId é atualizado

)
if (!recipe) {
    return <div>Carregando...</div>;
  }

}
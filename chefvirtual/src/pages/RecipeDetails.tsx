import React from "react";
import { useParams } from "react-router-dom";
import { useRecipeDetails } from "../hooks/useRecipeDetails";

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { recipe, loading, error } = useRecipeDetails(recipeId || ""); //busca a receita com base no id 

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!recipe) {
    return <div>Receita não encontrada.</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image_url} alt={recipe.title} />
      <p>{recipe.description}</p>
    </div>
  );
};

export default RecipeDetails;

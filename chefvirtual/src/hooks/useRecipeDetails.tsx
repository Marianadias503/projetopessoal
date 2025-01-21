import { useState, useEffect } from "react";

// Interface da receita
interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url: string;
  ingredients: string[];
  instructions: string[];
}

// Função para buscar detalhes da receita pelo ID 
const getRecipeById = async (id: number): Promise<Recipe> => {
  // Substitua pela lógica de chamada à sua API
  const response = await fetch(`/api/recipes/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar os detalhes da receita");
  }
  return response.json();
};

// Hook personalizado
export const useRecipeDetails = (recipeId: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const recipeData = await getRecipeById(parseInt(recipeId)); // Busca receita
        setRecipe(recipeData); // Atualiza estado com dados da receita
      } catch (error: any) {
        setError(error.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipeDetails();
    }
  }, [recipeId]);

  return { recipe, loading, error };
};

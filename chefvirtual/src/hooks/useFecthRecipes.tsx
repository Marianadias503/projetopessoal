import { useState, useEffect } from "react";
import axios from "axios";

//HOOK PARA BUSCAR AS 6 RECEITAS MAIS SALVAS

export const useFetchRecipes = (url: string) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(url);
        setRecipes(response.data);
      } catch (err: any) {
        console.error("Erro ao buscar receitas:", err);
        setError("Erro ao buscar receitas.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [url]);

  return { recipes, loading, error };
};


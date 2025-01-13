import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { ButtonPublished } from "../components/ButtonPublished";
import { RecipeCard } from "../components/recipeCard";
import food from "../assets/food.png"; 

import axios from "axios"; // Importando o axios para fazer requisições HTTP

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]); // Inicializando o estado para armazenar as receitas

  // Fetching recipes from the API
  useEffect(() => {
    // Chama a API para buscar as receitas
    axios
      .get("http://localhost:3000/") // A URL que está no servidor backend para pegar as 6 receitas
      .then((response) => {
        setRecipes(response.data); // Atualiza o estado com os dados da API
      })
      .catch((error) => {
        console.error("Erro ao buscar receitas:", error);
      });
  }, []); // useEffect só roda uma vez 

  return (
    <div className={"flex flex-col items-center justify-between min-h-screen p-5 bg-[#333333]"}>
      <img className={"w-60 rounded-full mt-[-1cm] "} src={Logo} alt="Logo da aplicação" />
      <h1 className={"text-white"}>Nossos top 6 em receitas salvas </h1>
      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* Renderizando os RecipeCard com base nos dados da minha API */}
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            imageUrl={recipe.image_url || food} // Se a imagem não existir, usa a imagem padrão
            title={recipe.title}
          />
        ))}
      </div>

      <div className="w-50">
        <ButtonPublished title="Publicar uma receita" color="#F05050" />
        <ButtonPublished title="Ver mais receitas" color="#F05050" />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchRecipes } from "../hooks/useFecthRecipes"; 
import Logo from "../assets/logo.png"; 
const AllRecipesPage: React.FC = () => {

  // Usando o hook para buscar todas as receitas
  const { recipes, loading, error } = useFetchRecipes("http://localhost:3000/receitas");
  const navigate = useNavigate(); // Hook para navegação

  // Função para navegar para a página de detalhes da receita
  const handleViewRecipe = (recipe: any) => {
    navigate(`/recipe/${recipe.id}`, { state: recipe }); // Passando a receita estado na minha url
  };

  if (loading) {
    return (
    //logo
    <div className=" flex flex-col items-center justify-between min-h-screen p-0 bg-[#333333]">
      <img className={"w-60 rounded-full"} src={Logo} alt="Logo da aplicação" />
    <h1>Receita sendo carregada </h1>
    </div>
    
)
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" grid-cols-3">
      <h1>Todas as Receitas</h1>
      <div className="grid grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card border p-4 rounded-md">
            <h2>{recipe.title}</h2>
            {/* Botão para redirecionar para a página da receita */}
            <button
              onClick={() => handleViewRecipe(recipe)} // Passando a receita inteira
              className="bg-orange-500 text-white py-2 px-4 rounded mt-4"
            >
              Ver Receita
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipesPage;

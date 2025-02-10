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
      // Logo e mensagem de carregamento 
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#333333]">
        <img className="w-60 rounded-full" src={Logo} alt="Logo da aplicação" />
        <h1 className="text-white mt-4"> Receita sendo carregada...</h1>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      {/* Título  */}
      <h1 className="mb-10 text-center text-3xl">Todas as Receitas</h1>

      {/* usei o display grid para exibir as receitas de forma responsiva  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-12 w-full">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border rounded-sm border-black w-full flex flex-col items-center justify-center p-4">
            {/* título da receita  */}
            <h2 className="text-center text-xl mb-4">{recipe.title}</h2>

            {/* passando a função handleViewRecipe para navegar até a pa´gina de detalhes da receita  */}
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


import { ButtonPublished } from "../components/ButtonPublished";
import { RecipeCard } from "../components/recipeCard";
import food from "../assets/food.png";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom"; 
import { useFetchRecipes } from "../hooks/useFecthRecipes"

const Home: React.FC = () => {
  
  const navigate = useNavigate(); // Hook para navegação
  const { recipes } = useFetchRecipes ("http://localhost:3000/"); //minha url padrão

  
  // Função para navegação ao clicar no botão
  const handlePublishClick = () => {
    navigate("/publish-recipe"); // Navegar para a página de PublishRecipe
  };

  return (
    <div className={"flex flex-col items-center justify-between min-h-screen p-5 bg-[#333333]"}>
      <img className={"w-60 rounded-full mt-[-1cm] "} src={Logo} alt="Logo da aplicação" />
      <h1 className={"text-white"}>Nossos top 6 em receitas salvas</h1>
      <div className="grid grid-cols-3 gap-6 mb-10">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            imageUrl={recipe.image_url || food}
            title={recipe.title}
          />
        ))}
      </div>

      <div className="w-50">
        <ButtonPublished 
         title="Publicar uma receita"
         color="primary" 
         onClick={handlePublishClick} />

        <ButtonPublished  
       
        title="Ver mais receitas" 
        color="primary" />
      </div>
    </div>
  );
};

export default Home;
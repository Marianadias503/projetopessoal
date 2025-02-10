import { ButtonPublished } from "../components/ButtonPublished";
import { RecipeCard } from "../components/recipeCard";
import { useNavigate } from "react-router-dom"; 
import { useFetchRecipes } from "../hooks/useFecthRecipes";
import Logo from "../assets/logo.png"; 

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { recipes } = useFetchRecipes("http://localhost:3000/");

  const handlePublishClick = () => {
    navigate("/publish-recipe");
  };
 const allRecipe = ()=>{
  navigate("/all-recipes")
 }
  return (
    <div className={"flex flex-col items-center justify-between min-h-screen p-0 bg-[#333333]"}>
      {/* Logo */}
      <div className=" borderfixed top-0 left-0 right-0 flex justify-center items-center z-10">
        <img className={"w-60 rounded-full"} src={Logo} alt="Logo da aplicação" />
      </div>
         {/* Titulo */}
      <h1 className={"text-white mt-0"}>Nossos top 6 em receitas salvas</h1>
       {/* Receitas */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title} />
        ))}
      </div>

      <div className="w-50 mb-10">
        <ButtonPublished 
         title="Publicar uma receita"
         color="primary" 
         onClick={handlePublishClick} />

        
        <ButtonPublished  
         title="Ver mais receitas" 
         color="primary" 
         onClick={allRecipe} />
      </div>
    </div>
  );
};

export default Home;

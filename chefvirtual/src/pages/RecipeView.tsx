import { useLocation } from "react-router-dom";
const RecipeView: React.FC = () => {
  const location = useLocation();
  const recipeData = location.state;
  console.log("Dados recebidos:", recipeData);
  
  return (
    <div>
      <h1>{recipeData.title}</h1>
      
      {recipeData.image_url && (
        <div className="mb-4">
          <img src={recipeData.image_url} alt="Receita" className="w-full" />
        </div>
      )}

      <p>{recipeData.steps}</p>
      <ul>
        {recipeData.description && recipeData.description.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};


export default RecipeView;

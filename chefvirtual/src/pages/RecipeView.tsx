
import { useLocation } from "react-router-dom";

const RecipeView: React.FC = () => {
  const location = useLocation(); //o useLocation vai retornar a minha rota(url)
  const recipeData = location.state; //com o state, eu consigo através da rota, pegar os dados que foram passado 

  return (
    <div>
      <h1>{recipeData.title}</h1>
      <p>{recipeData.steps}</p>
      <ul>
        {recipeData.description.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeView;

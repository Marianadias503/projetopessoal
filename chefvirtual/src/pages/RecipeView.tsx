import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Ícone de "home"

const RecipeView: React.FC = () => {
  const location = useLocation();
  const recipeData = location.state;
  const navigate = useNavigate();
  console.log("Dados recebidos:", recipeData);

  // Função para o usuário conseguir voltar para home 
  const goHome = () => {
    navigate("/"); 
  };

  return (
    <div className="bg-[#E0E0E0] w-full min-h-screen flex flex-col justify-between p-8">
      {/* Ícone de Home */}
      <button
        onClick={goHome}
        className="absolute top-4 left-4 text-3xl text-orange-500 hover:text-orange-700"
      >
        <FaHome />
      </button>

      <div className="flex-grow">
        <h1 className="text-black text-center text-3xl mb-6 mt-5">{recipeData.title}</h1> {/* Titulo da receita */}
        <div className="flex gap-8 mt-40">
          {/* Ingredientes */}
          <div className="w-full md:w-1/2">
            <h3 className="bg-orange-500 text-white py-2 px-4 rounded-t-lg text-center">Ingredientes</h3>
            <div className="bg-white rounded-b-lg p-4">
              <ul>
                {recipeData.description && recipeData.description.map((ingredient: string, index: number) => (
                  <li key={index} className="border-b py-2">{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Etapas da Receita */}
          <div className="w-full md:w-1/2">
            <h3 className="bg-orange-500 text-white py-2 px-4 rounded-t-lg text-center">Etapas da Receita</h3>
            <div className="bg-white rounded-b-lg p-4">
              <p className="text-gray-700">{recipeData.steps}</p>
            </div>
          </div>
        </div>
      </div>

      {/*  autor no final da página */}
      <footer className="mt-8 text-center">
        <p className="text-lg font-medium">
          Publicado por: <span className="text-orange-500">{recipeData.author}</span>
        </p>
      </footer>
    </div>
  );
};

export default RecipeView;

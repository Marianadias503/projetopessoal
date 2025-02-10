import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Ícone de "home"


const RecipeView: React.FC = () => {
  const location = useLocation();
  const recipeData = location.state;
  const navigate = useNavigate();

  // Verificação condicional para garantir que recipeData não seja null ou undefined
  if (!recipeData) {
    return <div>Receita não encontrada.</div>; 
  }

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
        {/* Verificação se recipeData.title existe antes de renderizar */}
        <h1 className="text-black text-center text-3xl mb-6 mt-5">
          {recipeData?.title || "Título não disponível"} {/* Título da receita */}
        </h1> 

        <div className="flex gap-8 mt-40">
          {/* Ingredientes */}
          <div className="w-full md:w-1/2">
            <h3 className="bg-orange-500 text-white py-2 px-4 rounded-t-lg text-center">Ingredientes</h3>
            <div className="bg-white rounded-b-lg p-4">
              <ul>
                {recipeData?.description && Array.isArray(recipeData.description) ? (
                  recipeData.description.map((ingredient: string, index: number) => (
                    <li key={index} className="border-b py-2">{ingredient}</li>
                  ))
                ) : (
                  <li>Ingredientes não disponíveis</li> // Caso os ingredientes não estejam disponíveis
                )}
              </ul>
            </div>
          </div>

          {/* Etapas da Receita */}
          <div className="w-full md:w-1/2">
            <h3 className="bg-orange-500 text-white py-2 px-4 rounded-t-lg text-center">Etapas da Receita</h3>
            <div className="bg-white rounded-b-lg p-4">
              <p className="text-gray-700">
                {recipeData?.steps || "Etapas não disponíveis"} {/* Etapas da receita */}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Autor no final da página */}
      <footer className="mt-8 text-center">
        <p className="text-lg font-medium">
          Publicado por: <span className="text-orange-500">{recipeData?.author || "Autor desconhecido"}</span>
        </p>
      </footer>
    </div>
  );
};

export default RecipeView;

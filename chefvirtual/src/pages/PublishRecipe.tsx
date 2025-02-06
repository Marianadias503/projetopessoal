import React from "react";
import { ButtonPublished } from "../components/ButtonPublished";
import { useNavigate } from "react-router-dom";
import { useRecipeData } from "../hooks/useRecipeData";
import { saveRecipe } from "../hooks/useSaveRecipeBd";


const PublishRecipe: React.FC = () => {
  const { recipeData, setRecipeData, handleInputChange } = useRecipeData();
  const navigate = useNavigate();
 // FUNÇÃO PARA TRABALHAR COM O ENVIO DO FORMULÁRIO 
 const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verifique se a estrutura do recipeData está correta
    console.log("Enviando receita:", recipeData);
  
    try {
      await saveRecipe(recipeData);
      navigate("/recipe-view", { state: recipeData });
    } catch (error) {
      console.error("Erro ao publicar a receita:", error);
    }
  };
  
  
  // FUNÇÃO PARA ADICIONAR UM NOVO CAMPO DE INGREDIENTES
  const addIngredientField = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      description: [...prevData.description, ""],
    }));
  };

  // FUNÇÃO PARA LIDAR COM A ATUALIZAÇÃO DE INGREDIENTES
  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setRecipeData((prevData) => {
      const updatedIngredients = [...prevData.description];
      updatedIngredients[index] = value;
      return { ...prevData, description: updatedIngredients };
    });
  };

  // FUNÇÃO PARA LIDAR COM O ENVIO DO ARQUIVO
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Pega o primeiro arquivo
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Cria a URL do arquivo
      setRecipeData((prevData) => ({
        ...prevData,
        image_url: imageUrl, // Armazena a URL da imagem
      }));
    }
  };
  

    return (
        <div className="bg-[#E0E0E0] p-8 flex flex-col items-center justify-center">
            <form onSubmit={handlePublish} className="w-full max-w-4xl mx-auto flex flex-col items-center">
                {/* Título da receita */}
                <div className="mb-8 w-1/2">
                    <input
                        className="border border-black text-center p-2 rounded-lg w-full"
                        type="text"
                        name="title"
                        placeholder="Digite o nome da receita"
                        value={recipeData.title}
                        onChange={handleInputChange}
                    />
                </div>

                 {/* Compartilhamento de foto/vídeo */}
        <div className="flex flex-col items-center mb-10 bg-gray-200 p-5 rounded-lg w-1/2">
          <label htmlFor="file" className="text-black mb-3 cursor-pointer">
            Compartilhe aqui a foto/vídeo da sua receita 📷
          </label>
          <input
            className="text-black"
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange} 
          />
        </div>

                {/* Lista de ingredientes */}
                <div className="mb-8 w-1/2">
                    <h3 className="mb-4 text-lg font-bold">Ingredientes</h3>
                    {recipeData.description.map((description, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                className="border border-gray-400 p-2 rounded-lg w-full"
                                type="text"
                                name={`description-${index}`}
                                placeholder={`Ingrediente  ${index +1} `} //usei o index+1, pois o array começa smepre na posição 0, então caso seja o primeiro ingrediente, se não usasse o +1, ficaria 'ingrediente 0' 
                                value={description}
                                onChange={(e) => handleIngredientChange(e, index)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addIngredientField}
                        className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                    >
                        Adicionar Ingrediente
                    </button>
                </div>

                {/* Etapas da receita */}
                <div className="w-full md:w-1/2">
                    <h3 className="bg-orange-500 text-white py-2 px-4 rounded-t-lg text-center">
                        Etapas da Receita
                    </h3>
                    <div className="bg-white rounded-b-lg p-4">
                        <textarea
                            placeholder="Descreva o modo de preparo..."
                            className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            name="steps"
                            value={recipeData.steps}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>

                {/* Botão de Publicar */}
                <div className="mt-10 flex justify-center w-full">
                    <ButtonPublished
                        title="Publicar essa receita"
                        color="primary"
                        type="submit"
                    />
                </div>

                {/* Rodapé */}
                <footer className="mt-10 text-center">
                    <h3>
                        Publicado por
                        <span>
                            <input
                                className="bg-transparent ml-2 mr-2 border border-black rounded-lg p-1"
                                type="text"
                                name="author"
                                placeholder="Adicione seu nome aqui"
                                value={recipeData.author}
                                onChange={handleInputChange}
                            />
                        </span>
                        Veja o perfil clicando
                        <a className="text-red-600" href="#">
                            AQUI
                        </a>
                    </h3>
                </footer>
            </form>
        </div>
    );
};

export default PublishRecipe;

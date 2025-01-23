import React from "react";
import { ButtonPublished } from "../components/ButtonPublished";
import { useNavigate } from "react-router-dom";
import { useRecipeData } from '../hooks/useRecipeData';

const PublishRecipe: React.FC = () => {
    const { recipeData, handleInputChange } = useRecipeData();
    const navigate = useNavigate();

    // Função que vai lidar com o envio do meu formulário 
    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault(); // Usado para evitar o comportamento padrão de envio de formulário
        alert("Receita publicada: " + JSON.stringify(recipeData, null, 2)); // Conversão para string, pois estou concatenando uma string com um objeto JS
        navigate("/recipes"); // Navegação após publicação, para página da receita pronta
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
                        value={recipeData.name}
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
                        onChange={handleInputChange}
                    />
                </div>

                {/* Lista de ingredientes */}
                <div className="flex flex-col md:flex-row md:justify-between w-full max-w-4xl mx-auto gap-6 items-center">
                    <div className="w-full md:w-1/2">
                        <h3 className="bg-orange-500 text-white py-2 px-4 rounded-t-lg text-center">
                            Ingredientes
                        </h3>
                        <div className="bg-white rounded-b-lg p-4">
                            {recipeData.ingredients.map((ingredient, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`Ingrediente ${index + 1}`}
                                    className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    name="ingredient"
                                    value={ingredient}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            ))}
                        </div>
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
                </div>

                {/* Botão de Publicar */}
                <div className="mt-10 flex justify-center w-full">
                    <ButtonPublished
                        title="Publicar essa receita"
                        color="primary"
                        type="submit" // O tipo "submit" é necessário para o envio do formulário
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

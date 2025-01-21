import React, { useState } from "react";
import { ButtonPublished } from "../components/ButtonPublished";
import { useNavigate } from "react-router-dom";
import {useRecipeData} from '../hooks/useRecipeData'

const PublishRecipe: React.FC = () => {
   
    const {recipeData, handleInputChange} = useRecipeData ();
    const navigate = useNavigate();
    const handlePublish = () => {
    console.log("Receita publicada:", recipeData);
    navigate("/recipes"); // Navegação após publicação
    
  }

  return (
    <div className="bg-[#E0E0E0] p-8 flex flex-col items-center justify-center">
      {/* Título da receita */}
      <div className="mb-8">
        <input
          className="border border-black text-center w-full p-2 rounded-lg"
          type="text"
          name="name"
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
      <ButtonPublished
        className="mt-10 text-red-950"
        title="Publicar essa receita"
        color="#f97316"
        onClick={handlePublish}
      />

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
    </div>
  );
};

export default PublishRecipe;

import React from "react";
import { ButtonPublished } from "../components/ButtonPublished";

const PublishRecipe: React.FC = () => {
  return (
    <>
      <div className="bg-[#E0E0E0] p-8 flex flex-col items-center justify-center ">
        {/* Título da receita */}
        <div className="mb-8">
          <input
            className="border border-black text-center w-full p-2 rounded-lg"
            type="text"
            name="recipe"
            placeholder="Digite o nome da receita"
          />
        </div>

        {/* Compartilhamento de foto/vídeo */}
        <div className="flex flex-col items-center mb-10 bg-gray-200 p-5 rounded-lg w-1/2">
          <span className="text-black mb-3">
            Compartilhe aqui a foto/vídeo da sua receita 📷
          </span>
          <input
            className="text-black"
            type="file"
            name="recipe"
            id="recipe"
          />
        </div>

        {/* Lista de ingredientes */}
        <div className="flex flex-col md:flex-row md:justify-between w-full max-w-4xl mx-auto gap-6 items-center">
          {/* Ingredientes */}
          <div className="w-full md:w-1/2">
            <h3 className="bg-orange-500 text-white py-2 px-4 rounded-t-lg text-center">
              Ingredientes
            </h3>
            <div className="bg-white rounded-b-lg p-4">
              <input
                type="text"
                placeholder="Ingrediente 1"
                className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2  focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Ingrediente 2"
                className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Ingrediente 3"
                className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
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
              ></textarea>
            </div>
          </div>
        </div>

        {/* Botão de Publicar */}
        <ButtonPublished
          className="mt-10 text-red-950"
          title="Publicar essa receita"
          color="#f97316"
        />

        {/* Rodapé */}
        <footer className="mt-10 text-center">
          <h3>
            Publicado por
            <span>
              <input
                className="bg-transparent ml-2 mr-2 border border-black rounded-lg p-1"
                type="text"
                name=""
                placeholder="Adicione seu nome aqui"
              />
            </span>
            Veja o perfil clicando
            <a className="text-red-600" href="#">
              AQUI
            </a>
          </h3>
        </footer>
      </div>
    </>
  );
};

export default PublishRecipe;

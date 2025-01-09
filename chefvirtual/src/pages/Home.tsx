import React from "react";
import Logo from '../assets/logo.png';
import { ButtonPublished } from "../components/ButtonPublished";
import { RecipeCard } from "../components/recipeCard";
import  food  from '../assets/food.png'; 

const Home: React.FC = () => {
  return (

    <div className={"flex flex-col items-center justify-between min-h-screen p-5 bg-[#333333] "}> 
   
      <img className={"w-60 rounded-full mt-[-1cm] "} src={Logo} alt="Logo da aplicação" />

      <div className="grid grid-cols-3 gap-6 mb-10">

      <RecipeCard
        imageUrl={food} 
        title="Arroz"
        
      />
      
      <RecipeCard
        imageUrl={food} 
        title="Arroz"
        
      />
      <RecipeCard
        imageUrl={food} 
        title="Arroz"
        
      />
      <RecipeCard
        imageUrl={food} 
        title="Arroz"
        
      />
      <RecipeCard
        imageUrl={food} 
        title="Arroz"
        
      />
      <RecipeCard
        imageUrl={food} 
        title="Arroz"
        
      />
  
  </div>
      <div className="w-50   ">
        <ButtonPublished 
          title="Publicar uma receita" 
          color="#F05050"   
        />
        <ButtonPublished 
          title="Ver mais receitas " 
          color="#F05050"   
        />
      </div>
    </div>
  );
};

export default Home;

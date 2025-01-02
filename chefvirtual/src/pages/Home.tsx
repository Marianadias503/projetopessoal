import React from "react";
import { RecipeCard } from "../components/recipeCard";

const Home:React.FC=()=>{

  return(
    <div>
    <RecipeCard
   
    imageUrl="image.png"
    title="Nome da receita salgada"
    type="salgada"
    
    />
    <RecipeCard
    imageUrl="image.png"
    title="Nome da receita doce"
    type="doce"
    
    />
      </div>
  )

}
export default Home
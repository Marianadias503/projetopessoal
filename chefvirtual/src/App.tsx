import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import PublishRecipe from "./pages/PublishRecipe";
import RecipeView from "./pages/RecipeView";

const App: React.FC = () => {
  return (
    <Routes> {/* faz o agrupamento de todas as rotas da aplicação */}
      <Route path="/" element={<Home />} />
      <Route path="/publish-recipe" element={<PublishRecipe />} />
      <Route path="/recipe-view" element={<RecipeView />} />
    </Routes>
  );
};

export default App;

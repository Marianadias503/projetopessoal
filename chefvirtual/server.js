const express = require("express");
const { getRecipes, getAllRecipes } = require("./src/database");
const app = express(); // instância que será usada para configurar rotas e iniciar o servidor

// Rota para retornar as 6 receitas mais salvas
app.get("/", (req, res) => {
  getRecipes((err, recipes) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar receitas mais salvas" });
    } else {
      res.json(recipes);
    }
  });
});

// Rota para buscar todas as receitas
app.get("/receitas", (req, res) => {
  getAllRecipes((err, recipes) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar todas as receitas" });
    } else {
      res.json(recipes);
    }
  });
});

const PORT = 3000;
// LISTEN inicia o servidor na porta definida, no caso 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

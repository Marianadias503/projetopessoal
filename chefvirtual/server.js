const express = require("express");
const cors = require("cors"); // Importa o middleware CORS
const { getRecipes, getAllRecipes } = require("./src/database");
const app = express(); // instância que será usada para configurar rotas e iniciar o servidor

// Usando o CORS para permitir requisições de qualquer origem
app.use(cors()); // Permite qualquer origem. Caso queira permitir apenas de uma origem específica, consulte o exemplo abaixo

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

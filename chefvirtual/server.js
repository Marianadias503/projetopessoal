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
// Rota para buscar os detalhes de uma receita específica
app.get("/receitas/:id", (req, res) => {
  const recipeId = parseInt(req.params.id, 10);

  const query = `SELECT * FROM recipes WHERE id = ?`;
  db.get(query, [recipeId], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar os detalhes da receita" });
    } else if (!row) {
      res.status(404).json({ error: "Receita não encontrada" });
    } else {
      res.json(row); // Retorna os detalhes da receita
    }
  });
});

const PORT = 3000;
// LISTEN inicia o servidor na porta definida, no caso 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

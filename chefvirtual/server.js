
const express = require("express");
const cors = require("cors");
const { getRecipes, getAllRecipes, createRecipe } = require("./src/database");
const app = express();

// Usando o CORS para permitir requisições de qualquer origem
app.use(cors());
app.use(express.json()); // usado para processar retornos no formato JSON
app.use(express.urlencoded({ extended: true }));

// Rota para retornar as 6 receitas mais salvas
app.get("/", (req, res) => {
  getRecipes((err, recipes) => {
    if (err) {
      res.send("<h1>Erro ao buscar receitas mais salvas</h1>");
    } else {
      res.json(recipes);
    }
  });
});

// Rota para buscar todas as receitas
app.get("/receitas", (req, res) => {
  getAllRecipes((err, recipes) => {
    if (err) {
      res.send("<h1>Erro ao buscar todas as receitas </h1>");
    } else {
      res.json(recipes);
    }
  });
});

// Rota para CRIAR uma nova receita (Post)
app.post('/create-recipe', async (req, res) => {
  const { title, description, steps, author } = req.body;

  createRecipe(title, description, steps, author, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Receita salva com sucesso", id: result.lastID });
  });
});

// Rota para ATUALIZAR uma receita (Put)
app.put("/update-recipe/:id", (req, res) => {
  const { title, description, author } = req.body; // req.body contém os dados enviados, no formato JSON
  const recipeId = parseInt(req.params.id, 10); // criei esta constante para pegar o id da receita e usei o parseInt, para transformar em número inteiro, caso venha em formato de string

  updateRecipe(recipeId, title, description, author, (err, result) => {
    if (err) {
      res.send("<h1>Erro ao tentar atualizar receita </h1>");
    } else {
      res.send(`<h1>Receita atualizada com sucesso!</h1><p>ID da receita: ${recipeId}</p>`);
    }
  });
});

// Rota para DELETAR uma receita (Delete)
app.delete("/delete-recipe/:id", (req, res) => {
  const recipeId = parseInt(req.params.id, 10);
  deleteRecipe(recipeId, (err, result) => {
    if (err) {
      res.json({ message: "Erro ao deletar receita" });
    } else {
      res.json({ message: "Receita deletada com sucesso" });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

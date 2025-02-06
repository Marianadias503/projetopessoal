const express = require("express");
const cors = require("cors");
const { getRecipes, getAllRecipes, createRecipe } = require("./src/database");
const sqlite3 = require('sqlite3').verbose(); 
const db = new sqlite3.Database('./src/database.db'); 
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');

// Usando o CORS para permitir requisições de qualquer origem
app.use(cors());
app.use(express.json()); //usado para processar retornos no formato JSON
app.use(express.urlencoded({ extended: true })); 
const upload = multer({ dest: 'uploads/' }); // Pasta onde os arquivos serão armazenados


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

// Rota para buscar os detalhes de uma receita específica
app.get("/recipe/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM recipes WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Erro ao recuperar receita:", err);
      return res.status(500).json({ error: "Erro ao recuperar receita" });
    }

    if (!row) {
      return res.status(404).json({ error: "Receita não encontrada" });
    }

    // Converte description de volta para objeto
    const recipe = {
      ...row,
      description: JSON.parse(row.description) // Converte de volta para objeto
    };

    // Retorna a receita recuperada
    res.status(200).json(recipe);
  });
});

// Rota para CRIAR uma nova receita (Post)
app.post('/create-recipe', upload.single('file'), async (req, res) => {
  const { title, description, steps, author } = req.body;
  const image_url = req.file ? req.file.path : null;

  createRecipe(title, description, steps, author, image_url, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Receita salva com sucesso", id: result.lastID });
  });
});



// Rota para ATUALIZAR uma receita (Put)
app.put("/update-recipe/:id", (req, res) => {
  const { title, ingredients, steps, file, author } = req.body; // req.body contém os dados enviados, no formato JSON
  const recipeId = parseInt(req.params.id, 10); // criei esta constante para pegar o id da receita e usei o parseInt, para transformar em número inteiro, caso venha em formato de string

  updateRecipe(recipeId, title, ingredients, steps, file, author, (err, result) => {
    if (err) {
      res.send("<h1>Erro ao tentar atualizar receita </h1>");
    } else if (result.affectedRows === 0) {
      res.send("<h1>Receita não encontrada </h1>");
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
    } else if (result.affectedRows === 0) {
      // Se affectedRows for 0, indica que não existe receita com o id que foi fornecido, ou seja, o número de linhas afetadas foram 0
      res.json({ message: "Receita não encontrada" });
    } else {
      res.json({ message: "Receita deletada com sucesso" });
    }
  });
});

const PORT = 3000;
// LISTEN inicia o servidor na porta definida, no caso 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

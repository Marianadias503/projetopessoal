const express = require("express");
const cors = require("cors"); 
const { getRecipes, getAllRecipes } = require("./src/database");
const app = express(); // instância que será usada para configurar rotas e iniciar o servidor

// Usando o CORS para permitir requisições de qualquer origem
app.use(cors()); 

// Rota para retornar as 6 receitas mais salvas
app.get("/", (req, res) => {
  getRecipes((err, recipes) => {
    if (err) {
      res.send('<h1>Erro ao buscar receitas mais salvas</h1>')
    } else {
      res.json(recipes);
    }
  });
});

// Rota para buscar todas as receitas
app.get("/receitas", (req, res) => {
  getAllRecipes((err, recipes) => {
    if (err) {
      res.send('<h1>Erro ao buscar todas as receitas </h1>')
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
      res.send('<h1>Erro ao buscar detalhes da receita </h1>')
    } else if (!row) {
      res.status(404).json({ error: "Receita não encontrada" });
    } else {

      res.json(row); // Retorna os detalhes da receita
    }
  });
});

//Rota para CRIAR uma nova receita (Post)
app.post("/create-recipe", (req, res) => {
  const { name, ingredients, steps } = req.body; 
  createRecipe(name, ingredients, steps, (err, result) => {
    if (err) {
      res.send('<h1>Erro ao tentar criar receita </h1>')
    } else {
      res.send({ message: "Receita criada com sucesso", id: result.insertId });
    }
  });
});

//Rota para ATUALIZAR uma receita (Put)
// o :id indica que a receita será atualizada com base nele 
//affectedRows é usado para comandos update, delete ou insert, quando um desses comandos é realizado o affectedRows é atualizado com o número de linhas que foram afetadas, 
//ou seja, caso realize o update, e nenhuma linha for afetada, indica que o id não foi encontrado e não existe a receita 
app.put("/update-recipe/:id", (req, res) => {
  const { name, ingredients, steps, file, author } = req.body; // req.body contém os dados enviados, no formato JSON
  const recipeId = parseInt(req.params.id, 10); // criei esta constante para pegar o id da receita e usei o parseInt, para transformar em número inteiro, caso venha em formato de string
  updateRecipe(recipeId, name, ingredients, steps, file, author, (err, result) => {
    if (err) {
      res.send('<h1>Erro ao tentar atualizar receita </h1>');
    } else if (result.affectedRows === 0) {
      res.send('<h1>Receita não encontrada </h1>');
    } else {
      // Corrigindo a forma de mostrar o ID da receita com interpolação de string
      res.send(`<h1>Receita atualizada com sucesso! </h1><p>ID da receita: ${result.id}</p>`);
    }
  });
});

//Rota para DELETAR uma receita (Delete)

app.delete("/delete-recipe/:id", (req,res)=>{
  const recipeId = parseInt(req.params.id, 10); 
  deleteRecipe(recipeId, (err, result) => {
    if (err) {
      res.send("<h1>Erro ao deletar receita</h1>");
    } else if (result.affectedRows === 0) {
      // Se affectedRows for 0, indica que não existe receita com o id que foi fornecido, ou seja, o número de linhas afetadas foram 0
      res.send("<h1>Receita não encontrada</h1>");
    } else {
     
      res.send("<h1>Sua receita foi deletada com sucesso</h1>");
    }
  });
});





app.use(express.json());
const PORT = 3000;
// LISTEN inicia o servidor na porta definida, no caso 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com banco de dados estabelecida com sucesso");

    createTables(() => {
      console.log("Tabelas verificadas e prontas para uso.");
    });
  }
});

// FUNÇÃO PARA CRIAR TABELAS
function createTables(callback) {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        steps TEXT NOT NULL,
        author TEXT NOT NULL,
        image_url TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela recipes:", err.message);
        } else {
          console.log("Tabela recipes criada/verificada com sucesso.");
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela users:", err.message);
        } else {
          console.log("Tabela users criada/verificada com sucesso.");
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS recipes_saves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela recipes_saves:", err.message);
        } else {
          console.log("Tabela recipes_saves criada/verificada com sucesso.");
        }
      }
    );

    if (callback) callback();
  });
}

// Função para criar uma nova receita (CREATE)
const createRecipe = (title, description, steps, image_url, author, callback) => {
  if (!title || !description || !steps || !author) {
    return callback(new Error("Todos os campos obrigatórios devem ser preenchidos."), null);
  }

  // Converter para string apenas se for um objeto ou array
  const descriptionString =
    typeof description === "object" ? JSON.stringify(description) : description;

  const query = `INSERT INTO recipes (title, description, steps, image_url, author) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [title, descriptionString, steps, image_url || null, author], function (err) {
    if (err) {
      return callback(err, null);
    }
    callback(null, { id: this.lastID });
  });
};

// Função para buscar todas as receitas
function getAllRecipes(callback) {
  db.all("SELECT * FROM recipes", (err, rows) => {
    if (err) {
      console.log("Erro ao buscar receitas", err.message);
      return callback(err, null);
    }
    callback(null, rows);
  });
}

// Função para buscar as 6 receitas mais salvas
function getRecipes(callback) {
  const query = `
    SELECT recipes.id, recipes.title, recipes.description, recipes.image_url,
    COUNT(recipes_saves.id) AS save_count
    FROM recipes
    LEFT JOIN recipes_saves ON recipes.id = recipes_saves.recipe_id
    GROUP BY recipes.id
    ORDER BY save_count DESC
    LIMIT 6;
  `;

  db.all(query, (err, rows) => {
    if (err) {
      console.log("Erro ao buscar receitas mais salvas", err.message);
      return callback(err, null);
    }
    callback(null, rows);
  });
}

// Atualizar uma receita (UPDATE)
function updateRecipe(id, title, description, image_url, author, callback) {
  const query = `
    UPDATE recipes 
    SET title = ?, description = ?, image_url = ?, author = ? 
    WHERE id = ?;
  `;
  db.run(query, [title, description, image_url, author, id], function (err) {
    callback(err, this);
  });
}

// Deletar uma receita (DELETE)
function deleteRecipe(id, callback) {
  db.run("DELETE FROM recipes WHERE id = ?", [id], (err) => {
    if (err) {
      console.log("Erro ao deletar a receita:", err.message);
      return callback(err);
    }
    console.log("Receita deletada com sucesso!");
    callback(null);
  });
}


// Exportando funções para uso externo
module.exports = {
  getRecipes,
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  db,
};

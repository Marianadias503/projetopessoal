const sqlite3 = require("sqlite3").verbose(); // Habilitando o modo verbose, que é usado para dar uma descrição mais detalhada dos dados

// Constante para criar ou abrir o arquivo database.db e fazer a conexão com o banco de dados
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.log("Erro ao conectar ao banco de dados", err.message);
  } else {
    console.log("Conexão com banco de dados estabelecida com sucesso");
    createTables(); // Criar as tabelas assim que a conexão for estabelecida
  }
});

// Função para criar as tabelas
function createTables() {
  const createTableSQL = `
    -- tabela de receitas 
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,          
      title TEXT NOT NULL,  -- Nome da receita
      description TEXT,     -- ingredientes
      steps TEXT,           -- Modo de preparo
      image_url TEXT,       -- Foto/vídeo
      author TEXT           -- Autor da receita
    );
    
    --tabela de receitas salvas 
    CREATE TABLE IF NOT EXISTS recipes_saves (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- tabela de usuário 
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `;




 
  // Executando o script SQL para criar as tabelas
  db.exec(createTableSQL, (err) => {
    if (err) {
      console.log("Erro ao criar as tabelas:", err.message);
    } else {
      console.log("Tabelas criadas com sucesso!");
      addRecipe(); // Após a criação das tabelas, insere uma receita de exemplo
    }
  });
}
const deleteallrecipe = (query, callback) => {
  db.run(query, function(err) {
    callback(err);
  });
};
// Função para adicionar uma receita
function addRecipe() {
  const insertRecipeQuery = `
    INSERT INTO recipes (title, description, image_url, author) 
    VALUES ('Torta de Maçã', 'Ingredientes: maçãs, açúcar, farinha', 'imagem.jpg', 'Maria');
  `;

  db.run(insertRecipeQuery, function (err) {
    if (err) {
      console.log("Erro ao inserir receita:", err.message);
    } else {
      console.log("Receita inserida com sucesso!");
      addRecipeSave(); // Após inserir a receita, realiza o salvamento
    }
  });
}

// Função para adicionar um salvamento de receita
function addRecipeSave() {
  const insertSaveQuery = `
    INSERT INTO recipes_saves (recipe_id, user_id) 
    VALUES (1, 1);  -- Usando a receita inserida (ID 1) e um usuário (ID 1)
  `;

  db.run(insertSaveQuery, function (err) {
    if (err) {
      console.log("Erro ao salvar receita:", err.message);
    } else {
      console.log("Receita salva com sucesso!");
    }
  });
}

// Função para buscar todas as receitas existentes no banco
function getAllRecipes(callback) {
  const query = `SELECT * FROM recipes`;
  db.all(query, (err, rows) => {
    if (err) {
      console.log("Erro ao buscar receitas", err.message);
    } else {
      callback(err, rows);
    }
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
    } else {
      callback(null, rows);
    }
  });
}

// Função para criar a nova receita (CREATE)
function createRecipe(title, ingredients, steps, image_url, author, callback) {
  const query = `INSERT INTO recipes (title, description, steps, image_url, author) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [title, ingredients, steps, image_url, author], function (err) {
    if (err) {
      return callback(err, null);
    }
    callback(null, { id: this.lastID });//lastId, gera um novo id automaticamente quando a receita é criada 
  });
}

// Função para atualizar uma receita (UPDATE)
function updateRecipe(id, title, description, image_url, author, callback) {
  const query = `
    UPDATE recipes 
    SET title = ?, description = ?, image_url = ?, author = ? 
    WHERE id = ?
  `;
  db.run(query, [title, description, image_url, author, id], function (err) {
    callback(err, this);
  });
}
//Função para deletar uma receita (DELETE)
function deleteRecipe(id, callback) {
  const query = `
    DELETE FROM recipes
    WHERE id = ?
  `;
  db.run(query, [ id], function (err) {
    callback(err, this);
  });
}
// Testar a inserção e consulta
getRecipes((err, recipes) => {
  if (err) {
    console.log("Erro ao buscar receitas:", err.message);
  } else {
    console.log("Receitas encontradas:", recipes);
  }
});

// Testando a consulta de todas as receitas
getAllRecipes((err, recipes) => {
  if (err) {
    console.log("Erro ao buscar todas as receitas:", err.message);
  } else {
    console.log("Todas as receitas:", recipes);
  }
});

module.exports = {
  getRecipes,
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,

  db,
};

import sqlite3 from "sqlite3"; 
sqlite3.verbose(); // Habilitando o modo verbose, que é usado para dar uma descrição mais detalhada dos dados 

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
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT
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
      addRecipe(); // Após criar as tabelas, adicionar uma receita para testar
    }
  });
}

// Função para adicionar uma receita
function addRecipe() {
  const insertRecipeQuery = `
    INSERT INTO recipes (title, description, image_url) 
    VALUES ('Receita de Teste', 'Descrição de Teste', 'imagem.jpg');
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
    VALUES (1, 1);
  `;

  db.run(insertSaveQuery, function (err) {
    if (err) {
      console.log("Erro ao salvar receita:", err.message);
    } else {
      console.log("Receita salva com sucesso!");
    }
  });
}

// Função para buscar as 6 receitas salvas
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

  // Consulta no banco de dados
  db.all(query, (err, rows) => {
    if (err) {
      console.log("Erro ao buscar receitas mais salvas", err.message);
    } else {
      callback(null, rows);
    }
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

--Armazena as informações das receita

CREATE TABLE recipes(
id INTEGER PRIMARY KEY AUTOINCREMENT, --Define o id como chave primaria, tipo de dado é INTEGER e o valor será gerado automaticamente
title TEXT NOT NULL,
description TEXT,
image_url TEXT

);

--Armazena as informações de quando um usuário salva uma receita, incluindo o ID da receita, o ID do usuário e a data da ação.
CREATE TABLE recipes_saves()

id INTEGER PRIMARY KEY AUTOINCREMENT, --Define o id como chave primaria, tipo de dado é INTEGER e o valor será gerado automaticamente
recipe_id INTEGER NOT NULL, --armazena o id da receita, é do tipo INTEGER(número inteiro)
user_id INTEGER NOT NULL, --armazena o id do usuário
saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- armazena a data e hora 
  FOREIGN KEY (recipe_id) REFERENCES recipes(id), --cria uma chave estrangeira FOREIGN KEY, que verifica se o valor inserido na coluna recipe_id existe na coluna id da tabela recipe
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);




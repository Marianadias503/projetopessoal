//importando o sqlite no modo verbose (esse modo permite ver informações detalhadas sobre os comandos executados)
const sqlite3= require('sqlite3').verbose();//require permite ultilizar as bibliotecas que foram instaladas (bibliotecas externas) nop caso foi importado sqlite3(que pe usado para interagir com SQLite no node.js)

//constante para criar ou abrir o arquivo database.db e fazer a conexão com o banco de dados
const db= new sqlite3.Database("./database.db", (err)=>{
    if(err){
        console.log("Erro ao conectar ao banco de dados", err.message)
    } else {
        console.log("conexão com banco de dados estabelecida com sucesso")
    }
})

//Funçaõ para buscar os dados das receitas

function getRecipes(callback){
    //o COUNT conta quantas vezes a receita foi salva na tabela recipes_saves, e o resultado será retornado na coluna save_count, que aparece apenas no momento da consulta, é criada dinamicamente
    //FROM define que o início da consulta será pela tabela recipes
    const query= `
     SELECT recipes.id, recipes.title, recipes.description, recipes.image_url,
        COUNT(recipes_saves.id) AS save_count 
        FROM recipes
        
    
    
    
    `
}
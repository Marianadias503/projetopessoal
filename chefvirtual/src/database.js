import sqlite3 from 'sqlite3';
import { readFile } from 'fs/promises';
import path from 'path';

// Caminho do banco de dados SQLite
const DB_PATH = './database.db';

// Caminho para o arquivo SQL (ajustado para o caminho correto)
const SQL_FILE_PATH = 'src/create_tables.sql';


// Definindo a conexão com o banco de dados
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conexão com o banco de dados SQLite estabelecida.');

   
});

// Ler o conteúdo do arquivo SQL
readFile(SQL_FILE_PATH, 'utf8')
    .then((sql) => {
        // Usar db.run para executar os comandos SQL
        db.serialize(() => {
            // Dividir os comandos SQL em uma lista e rodá-los um a um
            const commands = sql.split(';').filter(command => command.trim() !== '');
            
            commands.forEach(command => {
                db.run(command, (err) => {
                    if (err) {
                        console.error('Erro ao executar comando SQL:', err.message);
                    } else {
                        console.log('Comando executado com sucesso:', command);
                    }
                });
            });
        });
    })
    .catch((err) => {
        console.error('Erro ao ler o arquivo SQL:', err.message);
    })
    .finally(() => {
        // Fechar a conexão com o banco de dados
        db.close((err) => {
            if (err) {
                console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
            } else {
                console.log('Conexão com o banco de dados SQLite encerrada.');
            }
        });
    });

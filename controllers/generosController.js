//Sayuri
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarGeneros(request, response){
        try{
            const { id_genero = '%%' } = request.body;
            const { nome_genero = '%%' } = request.body;

            const  nome_g = nome_genero === '%%' ? '%%' : '%' + nome_genero + '%';
        
            const sql='SELECT id_genero, nome_genero FROM generos WHERE id_genero like ? AND nome_genero like ? ORDER BY nome_genero;';
            const values = [id_genero, nome_g];
            const generos = await db.query(sql, values);
            return response.status(200).json({confirma: "Sucesso", nResults: generos[0].lenght, message: generos[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try {
             // parâmetros passados via corpo da requisição
        const {id_genero, nome_genero} = request.body;
        // instrução sql para iserção
        const sql = 'INSERT INTO generos (id_genero, nome_genero) VALUES (?, ?)';
        // definição de array com os parâmetros que receberam os valores do front-end
        const values = [id_genero, nome_genero];
        // executa a instrução de inserção no banco de dados
        const confirmacao = await db.query(sql, values);
          // Exibe o id do registro inserido
          const generos = confirmacao[0].insertId;
          // Mensagem retorno no formato JSON
          return response.status(200).json({confirma: 'Sucesso', message: id_genero});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
        },
    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const { nome_genero } = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const { id_genero } = request.params; 
                // instrução sql para atualização
            const sql = 'UPDATE generos SET nome_genero = ? WHERE id_genero = ?;';  
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [nome_genero, id_genero];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
    async delete(request, response) { 
        try {
                // parâmetro passado via url na chamada da api pelo front-end
            const { id_genero } = request.params;    
                // comando de exclusão
            const sql = 'DELETE FROM generos WHERE id_genero = ?;'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [id_genero];
                // executa a instrução de exclusão no banco de dados    
            await db.query(sql, values);  
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message:'mensagens com id ' + id_genero + ' excluída com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
  };
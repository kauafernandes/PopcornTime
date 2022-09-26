//Kauã

const { json, response } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarReviews(request, response){
        try{
            const sql = 'SELECT id_usuario, id_titulo, review, data_review, avaliacao FROM reviews;';
            const reviews = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: reviews[0].length, message: reviews[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try{
            const { id_usuario, id_titulo, review, data_review, avaliacao } = request.body;
            const sql = 'INSERT INTO reviews (id_usuario, id_titulo, review, data_review, avaliacao) VALUES (?,?,?,?,?)';
            const values = [id_usuario, id_titulo, review, data_review, avaliacao];
            const confirmacao = await db.query(sql, values);
            const id_review = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: id_review});
        }catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const { review, data_review, avaliacao } = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const { id_usuario, id_titulo } = request.params; 
                // instrução sql para atualização
            const sql = 'UPDATE reviews SET review = ?, data_review = ?, avaliacao = ? WHERE id_usuario = ? AND id_titulo = ?;';  
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [review, data_review, avaliacao, id_usuario, id_titulo];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};

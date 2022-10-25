//Kauã

const { json, response } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarReviews(request, response){
        try{

            const { page = 1, limit = 5} = request.query;
            const inicio = (page -1) * limit;

            const { id_usuario = '%%'} = request.body;
            const { id_titulo = '%%'} = request.body;
            const { review = '%%'}= request.body;

            const review_nome = review === '%%' ? '%%' : '%' + review + '%';


            const sql = 'SELECT r.id_usuario, r.id_titulo, r.review, r.data_review, r.avaliacao FROM reviews r INNER JOIN usuarios u ON r.id_usuario = u.id_usuario INNER JOIN titulos t ON r.id_titulo = t.id_titulo WHERE r.id_usuario like ? AND r.id_titulo like ? AND r.review like ? ORDER BY r.review ASC LIMIT ?, ?;';
            const values = [id_usuario, id_titulo, review_nome, inicio,  parseInt(limit) ];
            const reviews = await db.query(sql, values);

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

    async delete(request, response) { 
        try {
                // parâmetro passado via url na chamada da api pelo front-end
            const { id_usuario, id_titulo} = request.params;    
                // comando de exclusão
            const sql = 'DELETE FROM reviews WHERE  id_usuario = ? and id_titulo =?;'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [id_usuario, id_titulo];
                // executa a instrução de exclusão no banco de dados    
            await db.query(sql, values);  
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message:'reviews com id ' + id_usuario + ' e ' + id_titulo + ' excluída com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
    
};


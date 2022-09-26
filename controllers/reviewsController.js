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
};
async update(request, response) {
    try{
        const {}
    }
}


UPDATE reviews SET review = 'Muito bom sai com depressão', data_review = '2022-01-14', avaliacao = '5' WHERE id_usuario = '2' AND id_titulo = '3';
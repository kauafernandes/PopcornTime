const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarReviews(request, response){
        try{
            const sql = 'SELECT id_usuario, id_titulo, review, data_review FROM reviews;';
            const reviews = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: reviews[0].length, message: reviews[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
//marcos

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarPosts(request, response){
        try{
            const sql='SELECT id_post, id_usuario, data_post, texto_post, imagem_post FROM posts;';
            const posts = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: posts[0].lenght, message: posts[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
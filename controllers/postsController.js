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
    async create(request, response){
        try {
            const {id_usuario, data_post, texto_post, imagem_post} = request.body;
            const sql ='INSERT INTO posts (id_usuario, data_post, texto_post, imagem_post) VALUES (?, ?, ?, ?)';
            const values = [id_usuario, data_post, texto_post, imagem_post];
            const confirmacao = await db.query(sql, values);
            const id_post = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message:id_post});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
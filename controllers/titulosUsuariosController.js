//marcos

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarTitulosUsuarios(request, response){
        try{
            const sql='SELECT id_usuario, id_titulo, avaliacao, status FROM titulosusuarios';
            const titulosUsuarios = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: titulosUsuarios[0].lenght, message: titulosUsuarios[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response){
        try {
            const {id_usuario, data_post, texto_post, imagem_post} = request.body;
            const sql ='INSERT INTO posts (id_usuario, data_post, texto_post) VALUES (?, ?, ?)';
            const values = [id_usuario, data_post, texto_post, imagem_post];
            const confirmacao = await db.query(sql, values);
            const id_post = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message:id_post});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
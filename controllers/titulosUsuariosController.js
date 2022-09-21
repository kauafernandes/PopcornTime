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
            const {id_usuario, id_titulo, avaliacao, status} = request.body;
            const sql ='INSERT INTO titulosUsuarios (id_usuario, id_titulo, avaliacao, status) VALUES (?, ?, ?, ?)';
            const values = [id_usuario, id_titulo, avaliacao, status];
            const confirmacao = await db.query(sql, values);
            const teste= confirmacao[0].insertId;
            console.log(teste);
            return response.status(200).json({confirma: 'Sucesso', message:{id_titulo, id_usuario}});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
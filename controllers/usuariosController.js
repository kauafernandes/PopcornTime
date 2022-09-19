// Thamires
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarUsuarios(request, response){
        try{
            const sql='SELECT id_usuario, email_usuario, nome_usuario, senha_usuario, apelido_usuario, genero_usuario, data_nasc_usuario, id_genero, foto_usuario, ponto_usuario FROM usuarios;';
            const usuarios = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].lenght, message: usuarios[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try{
            const {email_usuario, nome_usuario, senha_usuario, apelido_usuario, genero_usuario, data_nasc_usuario, id_genero, foto_usuario, ponto_usuario} = request.body;
            const sql = 'INSERT INTO usuarios (email_usuario, nome_usuario, senha_usuario, apelido_usuario, genero_usuario, data_nasc_usuario, id_genero, foto_usuario, ponto_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [email_usuario, nome_usuario, senha_usuario, apelido_usuario, genero_usuario, data_nasc_usuario, id_genero, foto_usuario, ponto_usuario];
            const confirmacao = await db.query(sql, values);
            const id_usuario = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: id_usuario});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};



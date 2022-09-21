//Kauã

const { json, response } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarRelacionamentos(request, response){
        try{
            const sql = 'SELECT usuario_log, usuario_rel, seguindo, bloqueado FROM relacionamentos;';
            const relacionamentos = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: relacionamentos[0].length, message: relacionamentos[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try{
            const { usuario_log, usuario_rel, seguindo, bloqueado } = request.body;
            const sql = 'INSERT INTO relacionamentos (usuario_log, usuario_rel, seguindo, bloqueado) VALUES (?,?,?,?)';
            const values = [usuario_log, usuario_rel, seguindo, bloqueado];
            const confirmacao = await db.query(sql, values);
            const id_relacionamento = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: id_relacionamento});
        }catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
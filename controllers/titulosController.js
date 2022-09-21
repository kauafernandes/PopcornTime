//Marielle
const { json, request, response } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarTitulos(request, response){
        try{
            const sql= 'SELECT id_titulo, id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo FROM titulos;';
            const titulos = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso',  nResults: titulos[0].length, message: titulos[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async create(request, response) {
        try {
            const {id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo} = request.body;
            const sql = 'INSERT INTO titulos (id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo];
            const confirmacao = await db.query(sql, values);
            const id_titulo = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: id_titulo});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
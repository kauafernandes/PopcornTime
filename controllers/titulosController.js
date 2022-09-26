//Marielle
const { json, request, response } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarTitulos(request, response){
        try{
            const sql= 'SELECT id_titulo, id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo, id_api FROM titulos;';
            const titulos = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso',  nResults: titulos[0].length, message: titulos[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async create(request, response) {
        try {
            const {id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo, id_api} = request.body;
            const sql = 'INSERT INTO titulos (id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo, id_api) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo, id_api];
            const confirmacao = await db.query(sql, values);
            const id_titulo = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: id_titulo});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async update(request, response) { 
        try {
            const { id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo, id_api } = request.body;
            const { id_titulo } = request.params; 
                // instrução sql para atualização
            const sql = 'UPDATE titulos SET id_genero = ?, nome_titulo = ?, duracao_titulo = ?, sinopse_titulo = ?, cartaz_titulo = ?, temporadas_titulo = ?, trailer_titulo = ?, data_lancamento_titulo = ?, id_api = ? WHERE id_titulo = ?;';  
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [id_genero, nome_titulo, duracao_titulo, sinopse_titulo, cartaz_titulo, temporadas_titulo, trailer_titulo, data_lancamento_titulo, id_api, id_titulo];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};
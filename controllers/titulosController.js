//Marielle
const { json, request, response } = require("express");
const db = require("../database/connection");
module.exports = {

    async listarTitulos(request, response){
        try{

            const { page = 1, limit = 5 } = request.query;
            const inicio = (page -1) * limit;

            const { id_titulo = '%%' } = request.body;
            const { id_genero = '%%' } = request.body;
            const { id_api = '%%' } = request.body;
            const { nome_titulo = '%%' } = request.body;

            const n_titulo = nome_titulo === '%%' ? '%%' : '%' + nome_titulo + '%';

            const sql= 'SELECT t.id_titulo, t.nome_titulo, g.nome_genero, t.duracao_titulo, t.sinopse_titulo, t.cartaz_titulo, t.temporadas_titulo, t.trailer_titulo, t.data_lancamento_titulo, t.id_api FROM titulos t INNER JOIN generos g ON t.id_genero = g.id_genero WHERE t.id_titulo like ? AND t.id_api like ? AND t.id_genero like ? AND t.nome_titulo like ? ORDER BY t.nome_titulo ASC LIMIT ?, ?;';
            const values = [id_titulo, id_genero, id_api, n_titulo, inicio, parseInt(limit)];
            const titulos = await db.query(sql, values);

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
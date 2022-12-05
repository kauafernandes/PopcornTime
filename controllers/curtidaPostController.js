//Luis

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarCurtidaPost(request, response){
        try{

            const { page = 1, limit = 20 } = request.query;
            const inicio = (page -1) * limit;

            const { id_post = '%%' } = request.body;
            const { id_usuario = '%%' } = request.body;


            const sql = 'SELECT usu.apelido_usuario, pos.texto_post, pos.imagem_post, pos.data_post FROM curtidapost cur INNER JOIN posts pos ON pos.id_post =  cur.id_post INNER JOIN usuarios usu ON usu.id_usuario = cur.id_post WHERE usu.id_usuario like ? AND pos.id_post like ? LIMIT ?, ?;';
            const values = [id_usuario, id_post, inicio, parseInt(limit)];
            const curtidapost = await db.query(sql, values);

            return response.status(200).json({confirma: "Sucesso", nResults: curtidapost[0].length, message: curtidapost[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
async create(request, response) {
    try {
        const {id_post, id_usuario} = request.body;
        const sql= 'INSERT INTO curtidapost (id_post, id_usuario) VALUES (?, ?)';
        const values = [id_post, id_usuario];
        const confirmacao = await db.query(sql, values);
        const teste = confirmacao[0].insertId;
        console.log(teste);
        return response.status(200).json({confirma: 'Sucesso', message: {id_post,  id_usuario}});
    } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
    }
    },    

    async delete(request, response) {
        try {
        const { id_usuario } = request.params;    
        const sql = 'DELETE FROM curtidapost WHERE id_usuario = ?'; 
        const values = [id_usuario];
        await db.query(sql, values);  
        return response.status(200).json({confirma: 'Sucesso', message:'curtida do usuário ' + id_usuario + ' retirada com sucesso'}); 
                }catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
                }       
            },
        };
//LuisHenrique

const { json, response } = require('express');
const db = require('../database/connection');

module.exports = {
    async listarComentariosPost(request, response){
        try{

            const { page = 1, limit = 5 } = request.query;
            const inicio = (page -1) * limit;

            const { id_comentario = '%%' } = request.body;
            const { id_post = '%%' } = request.body;
            const { id_usuario = '%%' } = request.body;
            const { comentario_post = '%%' } = request.body;

            const comentario = comentario_post === '%%' ? '%%' : '%' + comentario_post + '%';

            const sql = 'SELECT usu.apelido_usuario, com.comentario_post, pos.texto_post, pos.imagem_post, pos.data_post FROM comentariospost com INNER JOIN posts pos ON pos.id_post = com.id_post INNER JOIN usuarios usu ON usu.id_usuario = com.id_usuario WHERE com.id_comentario like ? AND com.comentario_post like ? AND com.id_post like ? AND com.id_usuario like ? ORDER BY pos.data_post ASC LIMIT ?, ?;';
            const values = [ id_comentario, comentario, id_post, id_usuario, inicio, parseInt(limit) ];
            const comentariospost = await db.query(sql, values);

            return response.status(200).json({confirma: "Sucesso", nResults: comentariospost[0].length, message: comentariospost[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
async create(request, response) {
    try {
        const {id_post, id_usuario, comentario_post} = request.body;
        const sql= 'INSERT INTO comentariospost (id_post, id_usuario, comentario_post) VALUES (?, ?, ?)';
        const values = [id_post, id_usuario, comentario_post];
        const confirmacao = await db.query(sql, values);
        const id_comentario = confirmacao[0].insertId;
        return response.status(200).json({confirma: 'Sucesso', message: id_comentario});
    } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
    }
},

async update(request, response) {
    try {
        const {id_post, id_usuario, comentario_post} = request.body;
        const {id_comentario} = request.params;
        const sql = 'UPDATE comentariospost SET id_post = ?, id_usuario = ?, comentario_post = ? WHERE id_comentario = ?;';
        const values = [id_post, id_usuario, comentario_post, id_comentario];
        const atualizacao = await db.query(sql, values);
        return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});
    } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
    }
},

async delete(request, response) {
    try {
    const { id_comentario } = request.params;    
    const sql = 'DELETE FROM comentariospost WHERE id_comentario = ?'; 
    const values = [id_comentario];
    await db.query(sql, values);  
    return response.status(200).json({confirma: 'Sucesso', message:'comentario com id ' + id_comentario + ' excluído com sucesso'}); 
            }catch (error) {
    return response.status(500).json({confirma: 'Erro', message: error});
            }       
        },
    };

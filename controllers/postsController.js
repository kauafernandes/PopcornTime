//marcos

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarPosts(request, response){
        try{
            const { id_post = "%%"} = request.body;
            const {id_usuario = "%%"} = request.body;
            const {data_post= "%%"} = request.body;
            const {apelido_usuario = "%%" } = request.body;


            const apelido_u = apelido_usuario === '%%' ? '%%' : '%' + apelido_usuario + '%';
            const data_p = data_post === '%%' ? '%%' : '%' + data_post + '%';

            const sql = 'SELECT p.id_post, p.id_usuario, p.data_post, p.texto_post, p.imagem_post, u.id_usuario, u.apelido_usuario, u.foto_usuario FROM posts p INNER JOIN usuarios u ON p.id_post = u.id_usuario WHERE p.id_post like ? AND p.id_usuario like ? AND p.data_post like ? AND u.apelido_usuario like ? ORDER BY p.id_post ASC;';
            const values = [id_post, id_usuario, data_p, apelido_u];
            const posts = await db.query(sql, values);
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
            return response.status(200).json({confirma: 'Sucesso', message: id_post});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
async update(request, response) {
    try {
        const {id_usuario, data_post, texto_post, imagem_post} = request.body;
        const {id_post} = request.params; 
        const sql = 'UPDATE posts SET id_usuario = ?, data_post = ?, texto_post = ?, imagem_post = ? WHERE id_post = ?;';
        const values = [id_usuario, data_post, texto_post, imagem_post, id_post];   
        const atualizacao = await db.query(sql, values);
        return response.status(200).json({confirma: 'Sucesso', message:'Dados atualizados'});            
    } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
    }   
},
};
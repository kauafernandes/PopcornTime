// Thamires
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarUsuarios(request, response){
        try{

            const { id_usuario = '%%' } = request.body;
            const { nome_usuario = '%%' } = request.body;
            const { apelido_usuario = '%%' } = request.body;

            const { page = 1, limit = 6 } = request.query;
            const inicio = (page -1) * limit;

            const nome_usu = nome_usuario === '%%' ? '%%' : '%' + nome_usuario + '%';
            const apelido_usu = apelido_usuario === '%%' ? '%%' : '%' + apelido_usuario + '%';

            const sql = 'SELECT u.id_usuario, u.email_usuario, u.nome_usuario, u.senha_usuario, u.apelido_usuario, u.genero_usuario, u.data_nasc_usuario, g.nome_genero, u.foto_usuario, u.ponto_usuario FROM usuarios u INNER JOIN generos g ON u.id_genero = g.id_genero WHERE u.id_usuario like ? AND u.nome_usuario like ? AND u.apelido_usuario like ? ORDER BY u.apelido_usuario ASC LIMIT ?, ?;';
            const values = [id_usuario, nome_usu, apelido_usu, inicio, parseInt(limit)];
            const usuarios = await db.query(sql, values);
            return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].lenght, message: usuarios[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async login(request, response){
        const { email_usuario, senha_usuario } = request.body;
        try{
            const sql = 'SELECT id_usuario, email_usuario, nome_usuario, senha_usuario, apelido_usuario FROM usuarios WHERE email_usuario = ? AND senha_usuario = ?;';
            const values = [email_usuario, senha_usuario];
            const usuarios = await db.query(sql, values);
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
    async update(request, response){
        try{
            // parâmtros passados via corpo da requisição
            const {email_usuario, nome_usuario, senha_usuario, apelido_usuario, genero_usuario, data_nasc_usuario, id_genero, foto_usuario, ponto_usuario} = request.body;
            // parâmetro passado via url na chamada da api pelo front-end
            const {id_usuario} = request.params;
            // instrução sql para atualização
            const sql = 'UPDATE usuarios SET email_usuario = ?, nome_usuario = ?, senha_usuario = ?, apelido_usuario = ?, genero_usuario = ?, data_nasc_usuario = ?, id_genero = ?, foto_usuario = ?, ponto_usuario = ? WHERE id_usuario = ?;';
            // definição de array com os parâmetros que receberam os valores do front-end
            const values = [email_usuario, nome_usuario, senha_usuario, apelido_usuario, genero_usuario, data_nasc_usuario, id_genero, foto_usuario, ponto_usuario, id_usuario];
            // executa a instrução de atualização no banco de dados 
            const atualizacao = await db.query(sql, values);
            // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
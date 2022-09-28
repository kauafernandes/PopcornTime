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
            const id_relacionamentos = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: id_relacionamentos});
        }catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const { seguindo, bloqueado } = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const { usuario_log, usuario_rel } = request.params; 
                // instrução sql para atualização
            const sql = 'UPDATE relacionamentos SET seguindo = ?, bloqueado = ? WHERE usuario_log = ? AND usuario_rel = ?;';  
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [seguindo, bloqueado];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};


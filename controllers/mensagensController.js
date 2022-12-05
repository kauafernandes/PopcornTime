//Sayuri
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarMensagens(request, response){
        try{

            const { page = 1, limit = 5 } = request.query;
            const inicio = (page -1) * limit;

            const { id_chat = '%%' } = request.body;
            const { destinatario = '%%' } = request.body;
            const { nome_usuario = '%%' } = request.body;
            const { remetente = '%%' } = request.body;
            const { mensagem = '%%' } = request.body;
            const { data_mensagem = '%%' } = request.body;

            const nome_u = nome_usuario === '%%' ? '%%' : '%' + nome_usuario + '%';
            const m = mensagem === '%%' ? '%%' : '%' + mensagem + '%';
            
            const sql= 'SELECT m.id_chat, m.destinatario, u.nome_usuario, m.remetente, m.mensagem, m.data_mensagem, m.status_usuario FROM mensagens m INNER JOIN usuarios u ON m.remetente = u.id_usuario WHERE m.id_chat like ? AND m.destinatario like ? AND u.nome_usuario like ? AND m.remetente like ? AND m.mensagem like ? AND m.data_mensagem like ? ORDER BY m.id_chat LIMIT ?, ?;';
            const values = [id_chat, destinatario, nome_u, remetente, m, data_mensagem, inicio, parseInt(limit)];
            const mensagens = await db.query(sql, values);

            return response.status(200).json({confirma: 'Sucesso', nResults: mensagens[0].length, message: mensagens[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response) {
        try {
            // parâmetros passados via corpo da requisição
        const {destinatario, remetente, mensagem, data_mensagem, status_usuario} = request.body;
           // instrução sql para iserção 
        const sql = 'INSERT INTO mensagens (destinatario, remetente, mensagem, data_mensagem, status_usuario) VALUES (?, ?, ?, ?, ?)';
          // definição de array com os parâmetros que receberam os valores do front-end
        const values = [destinatario, remetente, mensagem, data_mensagem, status_usuario];
          // executa a instrução de inserção no banco de dados
        const confirmacao = await db.query(sql, values);
          // Exibe o id do registro inserido
        const id_chat = confirmacao[0].insertId;
          // Mensagem retorno no formato JSON
        return response.status(200).json({confirma: 'Sucesso', message: id_chat});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
        },
    async update(request, response) { 
      try {
          const { destinatario, remetente, mensagem, data_mensagem, status_usuario } = request.body;
          const { id_chat } = request.params; 
          const sql = 'UPDATE mensagens SET destinatario = ?, remetente = ?, mensagem = ?, data_mensagem = ?, status_usuario = ? WHERE id_chat = ?;';  
          const values = [destinatario, remetente, mensagem, data_mensagem, status_usuario, id_chat];   
          const atualizacao = await db.query(sql, values);
          return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
      } catch (error) { 
          return response.status(500).json({confirma: 'Erro', message: error});
      }
    },  
    
    async delete(request, response) { 
        try {
                // parâmetro passado via url na chamada da api pelo front-end
            const { id_chat } = request.params;    
                // comando de exclusão
            const sql = 'DELETE FROM mesas WHERE mes_id = ?'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [id_chat];
                // executa a instrução de exclusão no banco de dados    
            await db.query(sql, values);  
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message:'mensagens com id ' + id_chat + ' excluída com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
  };
//Sayuri
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarMensagens(request, response){
        try{
            return response.status(200).json({confirma: "Mensagens"}); 
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
              // parâmtros passados via corpo da requisição
          const { destinatario, remetente, mensagem, data_mensagem, status_usuario } = request.body;
              // parâmetro passado via url na chamada da api pelo front-end
          const { id_chat } = request.params; 
              // instrução sql para atualização
          const sql = 'UPDATE mensagens SET destinatario = ?, remetente = ?, mensagem = ?, data_mensagem = ? status_usuario = ? WHERE id_chat = ?;';  
              // definição de array com os parâmetros que receberam os valores do front-end
          const values = [destinatario, remetente, mensagem, data_mensagem, status_usuario, id_chat];   
              // executa a instrução de atualização no banco de dados    
          const atualizacao = await db.query(sql, values);
              // Mensagem de retorno no formato JSON
          return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
      } catch (error) { 
          return response.status(500).json({confirma: 'Erro', message: error});
      }
    },       
  };
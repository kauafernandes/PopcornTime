//marcos

const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarTitulosUsuarios(request, response){
        try{

            const { id_titulo = "%%"} = request.body;
            const {id_usuario = "%%"} = request.body;
            const {nome_titulo = "%%"} = request.body;
            const {nome_usuario = "%%" } = request.body;

            const nome_t = nome_titulo === '%%' ? '%%' : '%' + nome_titulo + '%';
            const nome_u = nome_usuario === '%%' ? '%%' : '%' + nome_usuario + '%';
            
            const { page = 1, limit = 5 } = request.query;
            const inicio = (page -1) * limit;

            const sql='SELECT tu.id_usuario, tu.id_titulo, tu.status, tu.favorito, t.cartaz_titulo, t.nome_titulo, u.nome_usuario FROM titulosusuarios tu INNER JOIN usuarios u ON tu.id_usuario = u.id_usuario INNER JOIN titulos t ON tu.id_titulo = t.id_titulo WHERE tu.id_usuario like ? AND tu.id_titulo like ? AND t.nome_titulo like ? AND u.nome_usuario like ?;';
            const values = [id_usuario, id_titulo, nome_t, nome_u, inicio, parseInt(limit)];
            const titulosUsuarios = await db.query(sql, values);
            return response.status(200).json({confirma: 'Sucesso', nResults: titulosUsuarios[0].lenght, message: titulosUsuarios[0]}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create(request, response){
        try {
            const {id_usuario, id_titulo, status, favorito} = request.body;
            const sql ='INSERT INTO titulosUsuarios (id_usuario, id_titulo, status, favorito) VALUES (?, ?, ?, ?)';
            const values = [id_usuario, id_titulo, status, favorito];
            const confirmacao = await db.query(sql, values);
            const titulosUsuarios = confirmacao[0].insertId; 
            return response.status(200).json({confirma: 'Sucesso', message:{id_titulo, id_usuario}});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

   async update(request, response) {
        try {
            const { status, favorito} = request.body;
            const {id_usuario, id_titulo } = request.params; 
            const sql = 'UPDATE titulosusuarios SET status = ?, favorito = ? WHERE id_usuario = ? AND id_titulo = ?;';  
            const values = [status, favorito, id_usuario, id_titulo];   
            const atualizacao = await db.query(sql, values);
            return response.status(200).json({confirma: 'Sucesso', message:'Dados atualizados'});            
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
   },
   async delete(request, response) { 
    try {
            // parâmetro passado via url na chamada da api pelo front-end
        const { id_usuario, id_titulo} = request.params;    
            // comando de exclusão
        const sql = 'DELETE FROM titulosusuarios WHERE  id_usuario = ? and id_titulo =?;'; 
            // definição de array com os parâmetros que receberam os valores do front-end
        const values = [id_usuario, id_titulo];
            // executa a instrução de exclusão no banco de dados    
        await db.query(sql, values);  
            // Mensagem de retorno no formato JSON
        return response.status(200).json({confirma: 'Sucesso', message:'titulosUsuarios com id ' + id_usuario + ' e ' + id_titulo + ' excluída com sucesso'}); 
    } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
    }        
},
};

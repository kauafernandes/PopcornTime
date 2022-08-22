const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarRelacionamentos(request, response){
        try{
            return response.status(200).json({confirma: "Relacionamentos"}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
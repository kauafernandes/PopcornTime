const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarGeneros(request, response){
        try{
            return response.status(200).json({confirma: "Generos"}); 
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
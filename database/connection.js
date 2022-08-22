const mysql = require('mysql2/promise');

const bd_usuario = 'm120_tcc_g5_us';
const bd_senha = 'theb02';
const bd_servidor = '10.67.22.216';
const bd_porta = '3306';
const bd_banco = 'm120_tcc_g5_bd';
let connection;

const config = {
    host: bd_servidor,
    port: bd_porta,
    user: bd_usuario,
    password: bd_senha,
    database: bd_banco,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}

try{
    connection = mysql.createPool(config);

    console.log('Chamou conexão MySql!');

} catch (error){
    console.log(error);
}

module.exports = connection;

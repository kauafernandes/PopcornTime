const db = require("../database/connection");
const express = require('express');
const router = express.Router();

// importação dos controlers utilizados nas rotas
const ComentarioPostController = require('../controllers/comentarioPostController');
const CurtidaPostController = require('../controllers/curtidaPostController');
const GenerosController = require('../controllers/generosController');
const MensagensController = require('../controllers/mensagensController');
const PostsController = require('../controllers/postsController');
const RelacionamentosController = require('../controllers/relacionamentosController');
const ReviewsController = require('../controllers/reviewsController');
const TitulosUsuariosController = require('../controllers/titulosUsuariosController');
const UsuariosController = require('../controllers/usuariosController');

// definição das rotas
router.get('/comentariopost', ComentarioPostController.listarComentarioPost);
router.get('/curtidapost', CurtidaPostController.listarCurtidaPost);
router.get('/generos', GenerosController.listarGeneros);
router.get('/mensagens', MensagensController.listarMensagens);
router.get('/posts', PostsController.listarPosts);
router.get('/relacionamentos', RelacionamentosController.listarRelacionamentos);
router.get('/reviews', ReviewsController.listarReviews);
router.get('/titulosusuarios', TitulosUsuariosController.listarTitulosUsuarios);
router.get('/usuarios', UsuariosController.listarUsuarios);


// cadastrar
// editar
// excluir


module.exports = router;
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
// cadastrar
// editar
// excluir

router.get('/curtidapost', CurtidaPostController.listarCurtidaPost);
// cadastrar
// editar
// excluir

router.get('/generos', GenerosController.listarGeneros);
// cadastrar
// editar
// excluir

router.get('/mensagens', MensagensController.listarMensagens);
// cadastrar
// editar
// excluir

router.get('/posts', PostsController.listarPosts);
// cadastrar
// editar
// excluir

router.get('/relacionamentos', RelacionamentosController.listarRelacionamentos);
router.get('/relacionamentos', RelacionamentosController.create);
// editar
// excluir

router.get('/reviews', ReviewsController.listarReviews);
router.post('/reviews', ReviewsController.create);
// editar
// excluir

router.get('/titulosusuarios', TitulosUsuariosController.listarTitulosUsuarios);
// cadastrar
// editar
// excluir

router.get('/usuarios', UsuariosController.listarUsuarios);
// cadastrar
// editar
// excluir

module.exports = router;
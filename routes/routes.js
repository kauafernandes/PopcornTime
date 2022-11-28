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
router.post('/generos', GenerosController.create);
router.patch('/generos/:id_genero', GenerosController.update);
router.delete('/generos/:id_genero', GenerosController.delete);

router.get('/mensagens', MensagensController.listarMensagens);
router.post('/mensagens', MensagensController.create);
router.patch('/mensagens/:id_chat', MensagensController.update);
router.delete('/mensagens/:id_chat', MensagensController.delete);

router.get('/posts', PostsController.listarPosts);
// cadastrar
// editar
// excluir

router.get('/relacionamentos', RelacionamentosController.listarRelacionamentos);
// cadastrar
// editar
// excluir

router.get('/reviews', ReviewsController.listarReviews);
// cadastrar
// editar
// excluir

router.get('/titulosusuarios', TitulosUsuariosController.listarTitulosUsuarios);
// cadastrar
// editar
// excluir

router.get('/usuarios', UsuariosController.listarUsuarios);
router.get('/usuarios/login', UsuariosController.login);
router.post('/usuarios', UsuariosController.create);
router.patch('/usuarios/:id_usuario', UsuariosController.update);
// excluir

module.exports = router;
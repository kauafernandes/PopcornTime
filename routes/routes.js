const db = require("../database/connection");
const express = require('express');
const router = express.Router();

// importação dos controlers utilizados nas rotas
const ComentariosPostController = require('../controllers/comentariosPostController');
const CurtidaPostController = require('../controllers/curtidaPostController');
const GenerosController = require('../controllers/generosController');
const MensagensController = require('../controllers/mensagensController');
const PostsController = require('../controllers/postsController');
const RelacionamentosController = require('../controllers/relacionamentosController');
const ReviewsController = require('../controllers/reviewsController');
const TitulosController = require('../controllers/titulosController');
const TitulosUsuariosController = require('../controllers/titulosUsuariosController');
const UsuariosController = require('../controllers/usuariosController');

// definição das rotas
router.get('/comentariospost', ComentariosPostController.listarComentariosPost);
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
router.post('/posts', PostsController.create);
router.patch('/posts/:id_post', PostsController.update);
// excluir

router.get('/relacionamentos', RelacionamentosController.listarRelacionamentos);
router.post('/relacionamentos', RelacionamentosController.create);
router.patch('/relaciomentos/:usuario_log/:usuario_rel', RelacionamentosController.update);
//excluir

router.get('/reviews', ReviewsController.listarReviews);
router.post('/reviews', ReviewsController.create);
router.patch('/reviews/:id_usuario/:id_titulo', ReviewsController.update);
router.delete('/reviews/:id_usuario/:id_titulo', ReviewsController.delete);

router.get('/titulos', TitulosController.listarTitulos);
router.post('/titulos', TitulosController.create);
router.patch('/titulos/:id_titulos', TitulosController.update);

router.get('/titulosusuarios', TitulosUsuariosController.listarTitulosUsuarios);
router.post('/titulosusuarios', TitulosUsuariosController.create);
router.patch('/titulosusuarios/:id_usuario/:id_titulo', TitulosUsuariosController.update);
router.delete('/titulosusuarios/:id_usuario/:id_titulo', TitulosUsuariosController.delete);

router.get('/usuarios', UsuariosController.listarUsuarios);
router.get('/usuarios/login', UsuariosController.login);
router.post('/usuarios', UsuariosController.create);
router.patch('/usuarios/:id_usuario', UsuariosController.update);
// excluir

module.exports = router;
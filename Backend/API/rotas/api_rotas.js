const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users',userController.mostrarUsuarios);
router.post('/users',userController.criarUsuario);
router.delete('/users/:id',userController.excluirUsuario);
module.exports = router;
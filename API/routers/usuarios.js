const UserController = require('./../controllers/usersController');
const express = require('express')
const router = express.Router()

router.get('/listall', UserController.listarTudo)
router.get('/listid/:id', UserController.buscaPorId)
router.post('/add', UserController.adicionar)
router.put('/update/:id', UserController.atualizar)
router.delete('/delete/:id', UserController.apagar )

module.exports = router
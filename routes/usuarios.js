const { Router } = require('express');
const { getUsuarios, putUsuario, postUsuario, deleteUsuario, patchUsuario } = require('../controller/usuarios');

const router = Router();

router.get('/', getUsuarios);
router.put('/:id', putUsuario);
router.post('/', postUsuario);
router.delete('/', deleteUsuario);
router.patch('/', patchUsuario);



module.exports = router;
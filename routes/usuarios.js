const { Router } = require('express');
const { check } = require('express-validator');
const {
    getUsuarios,
    putUsuario,
    postUsuario,
    deleteUsuario,
    patchUsuario
} = require('../controller/usuarios');
const {
    esRoleValido,
    emailExiste,
    usuarioById
} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/', getUsuarios);
router.put('/:id', [
    check('id', 'Esto no es un ID valido.').isMongoId(),
    check('id').custom(usuarioById),
    check('role').custom(esRoleValido),
    validarCampos
], putUsuario);
router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de tener mas de 6 caracteres.').isLength({ min: 6 }),
    check('email', 'El valor introducido no es un correo.').isEmail(),
    check('email').custom(emailExiste),
    //check('role', 'El ROLE es Obligatorio.').isIn(['ADMIN_ROLE', 'USER_ROLE']), Referencia
    check('role').custom(esRoleValido),
    validarCampos
], postUsuario);
router.delete('/', deleteUsuario);
router.patch('/', patchUsuario);



module.exports = router;
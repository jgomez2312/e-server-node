const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const validUser = await usuario.findOne({ email });
        if (!validUser) {
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos'
            });
        }

        // Verificar si el usuario tiene el estado en true
        if (!validUser.estado) {
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos'
            });
        }

        // Verificar si el password es correcto
        const validPass = bcryptjs.compareSync(password, validUser.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos'
            });
        }
        // Generar el JWT

        const token = await generarJWT(validUser.id);

        res.json({
            validUser,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, hable con el Administrador.'
        });
    }

};

module.exports = {
    login
};
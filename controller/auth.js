const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');



const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos'
            });
        }

        // Verificar si el usuario tiene el estado en true
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos'
            });
        }

        // Verificar si el password es correcto
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos'
            });
        }
        // Generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, hable con el Administrador.'
        });
    }

};

const googleSignIn = async(req = request, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, email } = await googleVerify(id_token);


        let usuario = await Usuario.findOne({ email });

        if (!usuario) {

            const data = {
                nombre,
                email,
                password: ':P',
                role: 'USER_ROLE',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador - Usuario Bloqueado'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido'
        });
    }
};

module.exports = {
    login,
    googleSignIn
};
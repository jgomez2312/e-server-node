const { response, request } = require('express');
const { HashCreator } = require('../helpers/hash-creator');

const Usuario = require('../models/usuario');



const getUsuarios = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const queryEstado = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(queryEstado),
        Usuario.find(queryEstado)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const putUsuario = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        resto.password = HashCreator(password);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    console.log(id);
    res.json(usuario);
};

const postUsuario = async(req = request, res = response) => {

    const { nombre, email, password, role } = req.body;
    const usuario = new Usuario({ nombre, email, password, role });

    // Encriptar la contraseña
    usuario.password = HashCreator(password);

    // Guardar los datos
    await usuario.save();
    res.status(201).json({
        usuario
    });
};

const deleteUsuario = (req = request, res = response) => {
    res.json({
        msg: 'Peticion Delete a mi api desde el controller'
    });
};

const patchUsuario = (req = request, res = response) => {
    res.json({
        msg: 'Peticion Patch a mi api desde el controller'
    });
};


module.exports = {
    getUsuarios,
    putUsuario,
    postUsuario,
    deleteUsuario,
    patchUsuario
};
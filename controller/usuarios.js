const { response, request } = require('express');


const getUsuarios = (req = request, res = response) => {
    res.json({
        msg: 'Peticion Get a mi api desde el Controller',

    });
};

const putUsuario = (req = request, res = response) => {

    const id = req.params.id;
    console.log(id);
    res.json({
        msg: 'Peticion Put a mi api desde el controler Controller',
        id
    });
};

const postUsuario = (req = request, res = response) => {
    const { nombre, edad } = req.body;
    res.status(201).json({
        msg: 'Peticion Post a mi api desde el controller',
        nombre,
        edad
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
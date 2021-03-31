const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({ role });
    if (!existeRole) {
        throw new Error(`El role ${role} no esta en la base de datos`);
    }
};

const emailExiste = async(email = '') => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El Email ${email} ya esiste en la base de datos `);
    }
};

const usuarioById = async(id) => {
    const isExisteUsuario = await Usuario.findById(id);
    if (!isExisteUsuario) {
        throw new Error(`El ID ${id} que ha solicitado no es es valido`);
    }
};
module.exports = {
    esRoleValido,
    emailExiste,
    usuarioById
};
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es un campo obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es un campo obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es un campo obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};



module.exports = model('Usuario', UsuarioSchema);
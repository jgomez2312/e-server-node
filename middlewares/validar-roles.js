const { request, response } = require("express");



const AdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verficar el ROL antes de ver el token'
        });
    }
    const { role, nombre } = req.usuario;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no tiene permisos de Administrador para realizar esta operacion.`
        });
    }

    next();
};

const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verficar el ROL antes de ver el token'
            });
        }
        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos ROLES: ${ roles }`
            });
        }

        next();
    };
};

module.exports = {
    AdminRole,
    tieneRole
};
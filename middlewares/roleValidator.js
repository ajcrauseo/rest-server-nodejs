const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero',
    });
  }

  const { rol, name } = req.user;

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not an admin`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primero',
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `Service require some of this roles: ${roles}`
      })
    }

    console.log(roles, req.user.rol);
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};

const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { SECRETE_OR_PRIVATE_KEY } = process.env;

const JWTValidator = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'Unauthorized, there is no token in the request',
    });
  }

  try {
    const { uid } = jwt.verify(token, SECRETE_OR_PRIVATE_KEY);

    const user = await User.findById(uid);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({
        msg: "Unauthorized, invalid token. User doesn't exist",
      });
    }

    // Verificar si el uid tiene state=true
    if (!user.state) {
      return res.status(401).json({
        msg: 'Unauthorized, invalid token. User with false state',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Unauthorized, invalid token',
    });
  }
};

module.exports = {
  JWTValidator,
};

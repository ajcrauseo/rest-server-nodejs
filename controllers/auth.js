const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: 'User/Password incorrect - Email',
      });
    }
    // Verificar si el usuario está activo
    if (!user.state) {
      return res.status(404).json({
        msg: 'User/Password incorrect - State: false',
      });
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(404).json({
        msg: 'User/Password incorrect - Password',
      });
    }

    // Generar JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }
};

module.exports = {
  login,
};

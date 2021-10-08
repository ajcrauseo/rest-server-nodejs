const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

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
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }
};

const googleAuth = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    // Si el user no existe
    if (!user) {
      const data = {
        name,
        email,
        password: 'totichulazo',
        img,
        rol: 'USER_ROLE',
        google: true,
      };

      user = new User(data);

      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        msg: 'User blocked',
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      msg: 'Token cannot be verify',
    });
  }
};

module.exports = {
  login,
  googleAuth,
};

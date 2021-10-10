const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const usersActive = { state: true };

  // Mejorar tiempo de respuesta de DB
  const [total, users] = await Promise.all([
    User.countDocuments(usersActive),
    User.find(usersActive).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // 10 por defecto
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); // 10 por defecto
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await user.save();

  res.json(user);
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: 'patch API - controller',
  });
};

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;

  // Borrando fisicamente
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
};

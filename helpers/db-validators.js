const Rol = require('../models/rol');
const User = require('../models/user');

const isRolValid = async (rol = '') => {
  const rolExists = await Rol.findOne({ rol });

  if (!rolExists) {
    throw new Error(`Rol ${rol} doesn't exist in DB`);
  }
};

const emailExists = async (email = '') => {
  const emailDB = await User.findOne({ email });
  if (emailDB) {
    throw new Error(`${email} is already in use`);
  }
};

const idExists = async (id) => {
  const idDB = await User.findById(id);
  if (!idDB) {
    throw new Error(`El id ${id} doesn't exist`);
  }
};

module.exports = {
  isRolValid,
  emailExists,
  idExists,
};

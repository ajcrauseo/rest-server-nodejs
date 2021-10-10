const { Category, Rol, User, Product } = require('../models');

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

const userIdExists = async (id) => {
  const idDB = await User.findById(id);
  if (!idDB) {
    throw new Error(`Id ${id} doesn't exist`);
  }
};

const categoryIdExists = async (id) => {
  const idDB = await Category.findById(id);
  if (!idDB) {
    throw new Error(`Id ${id} doesn't exist`);
  }
};

const productIdExists = async (id) => {
  const idDB = await Product.findById(id);
  if (!idDB) {
    throw new Error(`Id ${id} doesn't exist`);
  }
};

module.exports = {
  categoryIdExists,
  emailExists,
  isRolValid,
  productIdExists,
  userIdExists,
};

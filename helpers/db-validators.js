const { Category, Rol, User, Product } = require('../models');

// Roles

const isRolValid = async (rol = '') => {
  const rolExists = await Rol.findOne({ rol });

  if (!rolExists) {
    throw new Error(`Rol ${rol} doesn't exist in DB`);
  }
};

// Email exists

const emailExists = async (email = '') => {
  const emailDB = await User.findOne({ email });
  if (emailDB) {
    throw new Error(`${email} is already in use`);
  }
};

// User exists

const userIdExists = async (id) => {
  const idDB = await User.findById(id);
  if (!idDB) {
    throw new Error(`Id ${id} doesn't exist`);
  }
};

// Category exists

const categoryIdExists = async (id) => {
  const idDB = await Category.findById(id);
  if (!idDB) {
    throw new Error(`Id ${id} doesn't exist`);
  }
};

// Product exists

const productIdExists = async (id) => {
  const idDB = await Product.findById(id);
  if (!idDB) {
    throw new Error(`Id ${id} doesn't exist`);
  }
};

// Collection validator

const allowedCollections = (collection = '', collections = []) => {
  const included = collections.includes(collection);

  if (!included) {
    throw new Error(`The collection ${collection} is not allowed`)
  }

  return true;
};

module.exports = {
  allowedCollections,
  categoryIdExists,
  emailExists,
  isRolValid,
  productIdExists,
  userIdExists,
};

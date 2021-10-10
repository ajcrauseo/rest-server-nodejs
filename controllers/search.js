const { request, response } = require('express');
const { User, Category, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const collectionsAvailables = ['categories', 'products', 'rols', 'users'];

// Buscar usuarios
const searchUsers = async (query = '', res = response) => {
  const isMongoID = ObjectId.isValid(query);

  if (isMongoID) {
    const user = await User.findById(query);

    if (!user.state) {
      res.status(404).json({
        msg: 'This user has been deleted',
      });
    }

    return res.json({
      results: user ? [user] : [],
    });
  }

  const regexp = new RegExp(query, 'i');

  const users = await User.find({
    $or: [{ name: regexp }, { email: regexp }],
    $and: [{ state: true }],
  });

  res.json({
    total: users.length,
    results: users,
  });
};

// Buscar Categorias
const searchCategories = async (query = '', res = response) => {
  const isMongoID = ObjectId.isValid(query);

  if (isMongoID) {
    const category = await Category.findById(query);

    if (!category.state) {
      res.status(404).json({
        msg: 'This category has been deleted',
      });
    }

    return res.json({
      results: category ? [category] : [],
    });
  }

  const regexp = new RegExp(query, 'i');

  const categories = await Category.find({ name: regexp, state: true });

  res.json({
    total: categories.length,
    results: categories,
  });
};

// Buscar Productos
const searchProducts = async (query = '', res = response) => {
  const isMongoID = ObjectId.isValid(query);

  if (isMongoID) {
    const product = await Product.findById(query).populate('category', 'name');

    if (!product.state) {
      res.status(404).json({
        msg: 'This product has been deleted',
      });
    }

    return res.json({
      results: product ? [product] : [],
    });
  }

  const regexp = new RegExp(query, 'i');

  const products = await Product.find({ name: regexp, state: true }).populate(
    'category',
    'name',
  );

  res.json({
    total: products.length,
    results: products,
  });
};

const search = (req = request, res = response) => {
  const { collection, query } = req.params;

  if (!collectionsAvailables.includes(collection)) {
    return res.status(400).json({
      msg: `The collections availables are ${collectionsAvailables}`,
    });
  }

  switch (collection) {
    case 'categories':
      searchCategories(query, res);
      break;
    case 'products':
      searchProducts(query, res);
      break;
    case 'users':
      searchUsers(query, res);
      break;

    default:
      res.status(500).json({
        msg: 'Se me olvido hacer esta búsqueda',
      });
  }
};

module.exports = {
  search,
};

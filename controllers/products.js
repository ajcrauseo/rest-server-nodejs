const { request, response } = require('express');

const { Category, Product } = require('../models');

// Obtener productos
const getProducts = async (req = request, res = response) => {
  const { limit = 2, from = 0 } = req.query;

  const productActive = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(productActive),
    Product.find(productActive)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('user', 'name')
      .populate('category', 'name'),
  ]);

  res.json({
    total,
    products,
  });
};

// Obtener producto por ID
const getProductById = async (req = request, res = response) => {
  const { id } = req.params;

  const productById = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  if (!productById.state) {
    return res.status(400).json({
      msg: 'Invalid id, contact the admin',
    });
  }

  res.json({
    productById,
  });
};

// Crear producto
const createProduct = async (req = request, res = response) => {
  const { name, description, price = 0 } = req.body;

  // // Validar si ya existe el producto
  // const productDB = await Product.findOne({ name });
  // if (!!productDB) {
  //   return res.status(400).json({
  //     msg: `La cagetoria ${productDB?.name} ya existe`,
  //   });
  // }

  // Validar si existe la categoria
  const category = req.body.category.toUpperCase();
  const categoryDB = await Category.findOne({ name: category });

  if (!categoryDB) {
    res.status(400).json({
      msg: `The category "${category}" doesn't exist`,
    });
  }

  // Generar la data a guardar
  const data = {
    name: name.toUpperCase(),
    description,
    price,
    category: categoryDB,
    user: req.user._id,
  };

  const product = new Product(data);

  // Guardar DB
  await product.save();

  const productDone = await Product.findOne(product).populate('user', 'name');

  res.status(401).json({
    msg: 'OK - createProduct',
    productDone,
  });
};

// Modificar producto
const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const { description, price, available } = req.body;
  const name = req.body.name.toUpperCase();

  const data = {
    description,
    price,
    available,
    name,
  };

  const product = await Product.findByIdAndUpdate(id, data, { new: true })
    .populate('user', 'name')
    .populate('category', 'name');

  res.json(product);
};

// Eliminar producto
const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true },
  )
    .populate('user', 'name')
    .populate('category', 'name');

  res.json(product);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

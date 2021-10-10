const { request, response } = require('express');

const { Category } = require('../models');

// Obtener categorias
const getCategories = async (req = request, res = response) => {
  const { limit = 2, from = 0 } = req.query;

  const categoryActive = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(categoryActive),
    Category.find(categoryActive)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('user', 'name'),
  ]);

  res.json({
    total,
    categories,
  });
};

// Obtener categoria por ID
const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;

  const categoryById = await Category.findById(id).populate('user', 'name');

  if (!categoryById.state) {
    return res.status(400).json({
      msg: 'Invalid id, contact the admin',
    });
  }

  res.json({
    categoryById,
  });
};

// Crear categoria
const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (!!categoryDB) {
    return res.status(400).json({
      msg: `La cagetoria ${categoryDB?.name} ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  // Guardar DB
  await category.save();

  const categoryDone = await Category.findOne(category).populate(
    'user',
    'name',
  );

  res.status(201).json(categoryDone);
};

// Modificar categoria
const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const name = req.body.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
    },
  ).populate('user', 'name');

  res.json(category);
};

// Eliminar categoria
const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true },
  ).populate('user', 'name');

  res.json(category);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

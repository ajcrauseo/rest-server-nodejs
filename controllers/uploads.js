const path = require('path');
const fs = require('fs');
const { request, response } = require('express');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile: uploadFileHelper } = require('../helpers');
const { User, Product } = require('../models');

const uploadFile = async (req = request, res = response) => {
  try {
    const name = await uploadFileHelper(req.files, undefined, 'imgs');

    res.json(name);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateImg = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `User with ${id} id doesn't exist`,
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Product with ${id} id doesn't exist`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  // Limpiar imágenes previas
  if (model.img) {
    // const pathSplit = model.img.split('/');
    // const imgName = pathSplit[pathSplit.length - 1];

    // console.log(imgName);

    // Borrar la imagen del servidor
    if (fs.existsSync(model.img)) {
      fs.unlinkSync(model.img);
    }
  }

  const name = await uploadFileHelper(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
};

const updateImgCloudinary = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `User with ${id} id doesn't exist`,
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Product with ${id} id doesn't exist`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  // Limpiar imágenes previas
  if (model.img) {
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;

  await model.save();

  res.json(model);
};

const showImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  const imageEmpty = path.join(`${__dirname}/../assets/no-image.jpg`);

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `User with ${id} id doesn't exist`,
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Product with ${id} id doesn't exist`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  if (model.img) {
    return res.json(model.img);
  }

  return res.sendFile(imageEmpty);
};

module.exports = {
  showImage,
  uploadFile,
  updateImg,
  updateImgCloudinary,
};

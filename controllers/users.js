const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
  const { name = 'No name'} = req.query;

  res.json({
    msg: 'get API - controller',
    name,
  });
};

const putUsers = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'put API - controller',
    id,
  });
};

const postUsers = (req = request, res = response) => {
  const { name, edad } = req.body;

  res.json({
    msg: 'post API - controller',
    name,
    edad,
  });
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: 'patch API - controller',
  });
};

const deleteUsers = (req = request, res = response) => {
  res.json({
    msg: 'delete API - controller',
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
};

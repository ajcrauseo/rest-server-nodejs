const jwt = require('jsonwebtoken');

const { SECRETE_OR_PRIVATE_KEY } = process.env;

const generateJWT = (uid = '') => {
  return new Promise((res, rej) => {
    const payload = { uid };

    jwt.sign(
      // Payload
      payload,
      // Secret key
      SECRETE_OR_PRIVATE_KEY,
      // Options
      {
        expiresIn: '2h',
      },
      // Callback
      (err, token) => {
        if (err) {
          console.log(err);
          rej('No se pudo generar el token');
        } else {
          res(token);
        }
      },
    );
  });
};

module.exports = { generateJWT };

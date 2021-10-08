const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { JWTValidator } = require('../middlewares/jwt-validator');
const { isAdminRole, hasRole } = require('../middlewares/roleValidator');

module.exports = {
  fieldsValidator,
  JWTValidator,
  isAdminRole,
  hasRole,
};

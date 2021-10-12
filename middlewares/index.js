const { fieldsValidator } = require('./fieldsValidator');
const { uploadFileValidator } = require('./fileValidator');
const { JWTValidator } = require('./jwt-validator');
const { isAdminRole, hasRole } = require('./roleValidator');

module.exports = {
  fieldsValidator,
  hasRole,
  isAdminRole,
  JWTValidator,
  uploadFileValidator,
};

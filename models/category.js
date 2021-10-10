const { Schema, model } = require('mongoose');

const CatetorySchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CatetorySchema.methods.toJSON = function () {
  const {
    __v,
    _id: id,
    ...rest
  } = this.toObject();

  return {
    id,
    ...rest,
  };
};

module.exports = model('Category', CatetorySchema);

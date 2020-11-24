// require npm install --save moongoose
const mongoose = require('mongoose');
// require npm install --save moongoose-unique-validator
const unique_validator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

UserSchema.plugin(unique_validator);

module.exports = mongoose.model('User', UserSchema);

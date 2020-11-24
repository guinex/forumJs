const mongoose = require('mongoose');
const CourseSchema = mongoose.Schema({
  name: {type: String, required: true},
  year: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})
module.exports = mongoose.model('Course', CourseSchema);

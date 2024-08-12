const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  description: String,
  isVisible: Boolean,
  timer: Number,
  link: String,
});

module.exports = mongoose.model('Banner', BannerSchema);
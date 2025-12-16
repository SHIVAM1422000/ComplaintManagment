const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  plan: { type: String, enum: ['free','pro'], default: 'free' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Company', companySchema);

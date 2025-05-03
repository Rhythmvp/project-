const mongoose = require('mongoose');

const softwareSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  features: [String],
  pricingPlans: [
    {
      planName: String,
      price: String
    }
  ],
  logo: String,
  screenshots: [String]
});

module.exports = mongoose.model('Software', softwareSchema);

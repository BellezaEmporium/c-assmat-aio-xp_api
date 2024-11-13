const mongoose = require("mongoose");

// Modèle assistant(e) maternel(le)
const CareworkerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pajemploiNumber: {
    type: String,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Careworker", CareworkerSchema);
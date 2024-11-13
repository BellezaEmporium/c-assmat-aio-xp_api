const mongoose = require("mongoose");

// Modèle enfant
const ChildrenSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  employerLink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  }
});

module.exports = mongoose.model("Children", ChildrenSchema);
const mongoose = require("mongoose");

// Modèle employeur
const EmployerSchema = new mongoose.Schema({
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
    ssn: {
        type: String,
        required: true,
    },
    childrens: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Children",
    }
});

module.exports = mongoose.model("Employer", EmployerSchema);
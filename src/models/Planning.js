const mongoose = require("mongoose");

// Modèle planning
const PlanningSchema = new mongoose.Schema({
  careworkerLink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Careworker",
  },
  childLink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Children",
  },
  isFrequent: {
    type: Boolean,
    required: true,
  },
  // Fréquence liée au contrat. Planning donné par l'employeur. Sera reflété sur le calendrier
  frequency: {
    type: String,
    required: false
  },
  // Temps théorique de travail
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  // Calculé en fonction des dates de début et de fin
  workingHours: {
    type: Number,
    required: true,
  },
  // Si le bloc enfant à bien été effectué, le statut est "OK".
  // Si le bloc enfant à été effectué mais les temps de travail réels ne correspondent pas, le statut est "OK-Diff".
  // Si le bloc enfant n'a pas été effectué pour cause d'abandon, maladie enfant... le statut est "KO-R".
  status: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Planning", PlanningSchema);
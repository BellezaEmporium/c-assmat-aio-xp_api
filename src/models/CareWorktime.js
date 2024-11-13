const mongoose = require("mongoose");

// Modèle temps de travail assistant(e) maternel(le) par enfant pour contrat donné
const CareWorktimeSchema = new mongoose.Schema({
  planningLink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planning',
  },
  // Certains employeurs modifient les horaires de l'assistant(e) maternel(le) 
  // en plein temps de travail (ex: début 8h05 au lieu de 8h).
  // Cela reflète donc la différence entre les horaires théoriques et les horaires réels.
  realStartDate: {
    type: Date,
    required: false,
  },
  realEndDate: {
    type: Date,
    required: false,
  },
  realWorkingHours: {
    type: Number,
    required: false,
  }
});

module.exports = mongoose.model("CareWorktime", CareWorktimeSchema);
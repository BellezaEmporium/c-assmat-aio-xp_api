const express = require('express');
const { getChildrenData,
    getPlanningData,
    createChildrenData,
    createPlanningData,
    createEmployerData,
    getChildrenDataById,
    getPlanningDataById,
    getEmployerDataById,
    getCareWorktimeDataById, 
    getEmployerData, 
    updateChildrenData,
    updateCareWorktimeData,
    updateEmployerData,
    deletePlanningData,
    deleteChildrenData,
    deleteEmployerData } = require('../controller/dataController');

const router = express.Router();

// GET - Récupérer les données
router.get('/children', getChildrenData);
router.get('/children/:id', getChildrenDataById);
router.get('/employers', getEmployerData);
router.get('/employers/:id', getEmployerDataById);
router.get('/planning', getPlanningData);
router.get('/planning/:id', getPlanningDataById);
router.get('/worktime/:id', getCareWorktimeDataById);

// POST - Ajouter des données
router.post('/children/add', createChildrenData);
router.post('/employers/add', createEmployerData);
router.post('/planning/add', createPlanningData);

// PUT - Mettre à jour des données
router.put('/children/:id', updateChildrenData);
router.put('/worktime/:id', updateCareWorktimeData);
router.put('/employers/:id', updateEmployerData);

// DELETE - Supprimer des données
router.delete('/planning/:id', deletePlanningData);
router.delete('/children/:id', deleteChildrenData);
router.delete('/employers/:id', deleteEmployerData);

module.exports = router;

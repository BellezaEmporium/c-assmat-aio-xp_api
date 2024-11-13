// Import modèles
const Children = require('../models/Children');
const Planning = require('../models/Planning');
const Employer = require('../models/Employer');
const CareWorktime = require('../models/CareWorktime');
const Careworker = require('../models/Careworker');

// GET Controllers
// GET Controllers
const getChildrenData = async (req, res) => {
    try {
        const children = await Children.find();
        res.status(200).json(children);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getChildrenDataById = async (req, res) => {
    try {
        const child = await Children.findById(req.params.id);
        if (!child) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json(child);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCareworkerData = async (req, res) => {
    try {
        const careworkers = await Careworker.find();
        res.status(200).json(careworkers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployerData = async (req, res) => {
    try {
        const employers = await Employer.find().populate('childrens');
        res.status(200).json(employers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployerDataById = async (req, res) => {
    try {
        const employer = await Employer.findById(req.params.id).populate('childrens');
        if (!employer) return res.status(404).json({ message: 'Employer not found' });
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlanningData = async (req, res) => {
    try {
        const planning = await Planning.find()
            .populate('careworkerLink')
            .populate('childLink');
        res.status(200).json(planning);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlanningDataById = async (req, res) => {
    try {
        const planning = await Planning.findById(req.params.id)
            .populate('careworkerLink')
            .populate('childLink');
        if (!planning) return res.status(404).json({ message: 'Planning not found' });
        res.status(200).json(planning);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCareWorktimeDataById = async (req, res) => {
    try {
        const worktime = await CareWorktime.findById(req.params.id);
        if (!worktime) return res.status(404).json({ message: 'Worktime not found' });
        res.status(200).json(worktime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST Controllers
const createChildrenData = async (req, res) => {
    try {
        const newChild = new Children(req.body);
        const savedChild = await newChild.save();
        res.status(201).json(savedChild);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createEmployerData = async (req, res) => {
    try {
        const newEmployer = new Employer(req.body);
        const savedEmployer = await newEmployer.save();
        res.status(201).json(savedEmployer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createPlanningData = async (req, res) => {
    try {
        const newPlanning = new Planning({
            careworkerLink: req.body.careworkerLink,
            childLink: req.body.childLink,
            isFrequent: req.body.isFrequent,
            frequency: req.body.frequency,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            workingHours: req.body.workingHours,
            status: req.body.status
        });
        const savedPlanning = await newPlanning.save();
        res.status(201).json(savedPlanning);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createCareWorktimeData = async (req, res) => {
    try {
        const newWorktime = new CareWorktime({
            planningLink: req.body.planningLink,
            realStartDate: req.body.realStartDate,
            realEndDate: req.body.realEndDate,
            realWorkingHours: req.body.realWorkingHours
        });
        const savedWorktime = await newWorktime.save();
        res.status(201).json(savedWorktime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createCareworkerData = async (req, res) => {
    try {
        const newCareworker = new Careworker(req.body);
        const savedCareworker = await newCareworker.save();
        res.status(201).json(savedCareworker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT Controllers
const updateChildrenData = async (req, res) => {
    try {
        const updatedChild = await Children.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedChild) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json(updatedChild);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEmployerData = async (req, res) => {
    try {
        const updatedEmployer = await Employer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEmployer) return res.status(404).json({ message: 'Employer not found' });
        res.status(200).json(updatedEmployer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCareWorktimeData = async (req, res) => {
    try {
        const updatedWorktime = await CareWorktime.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedWorktime) return res.status(404).json({ message: 'Worktime not found' });
        res.status(200).json(updatedWorktime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePlanningData = async (req, res) => {
    try {
        const updatedPlanning = await Planning.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('careworkerLink').populate('childLink');

        if (!updatedPlanning) return res.status(404).json({ message: 'Planning not found' });

        if (req.body.realStartDate || req.body.realEndDate || req.body.realWorkingHours) {
            const worktime = await CareWorktime.findOneAndUpdate(
                { planningLink: req.params.id },
                {
                    planningLink: req.params.id,
                    realStartDate: req.body.realStartDate,
                    realEndDate: req.body.realEndDate,
                    realWorkingHours: req.body.realWorkingHours
                },
                { new: true, upsert: true }
            );
            
            res.status(200).json({
                planning: updatedPlanning,
                realHours: worktime
            });
        } else {
            res.status(200).json(updatedPlanning);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Controllers
const deleteChildrenData = async (req, res) => {
    try {
        const deletedChild = await Children.findByIdAndDelete(req.params.id);
        if (!deletedChild) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json({ message: 'Child deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployerData = async (req, res) => {
    try {
        const deletedEmployer = await Employer.findByIdAndDelete(req.params.id);
        if (!deletedEmployer) return res.status(404).json({ message: 'Employer not found' });
        res.status(200).json({ message: 'Employer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePlanningData = async (req, res) => {
    try {
        const deletedPlanning = await Planning.findByIdAndDelete(req.params.id);
        if (!deletedPlanning) return res.status(404).json({ message: 'Planning not found' });
        res.status(200).json({ message: 'Planning deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getChildrenData,
    getChildrenDataById,
    getCareworkerData,
    getEmployerData,
    getEmployerDataById,
    getPlanningData,
    getPlanningDataById,
    getCareWorktimeDataById,
    createChildrenData,
    createEmployerData,
    createPlanningData,
    createCareWorktimeData,
    createCareworkerData,
    updateChildrenData,
    updateEmployerData,
    updateCareWorktimeData,
    updatePlanningData,
    deleteChildrenData,
    deleteEmployerData,
    deletePlanningData
};
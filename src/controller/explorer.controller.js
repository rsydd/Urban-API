const { default: mongoose } = require('mongoose');
const Explorer = require('../model/explorer.model');
const Exploration = require('../model/exploration.model');


// Get All of The Explorer

const getAllExplorer = async (req, res) => {
    try {
        const explorers = await Explorer.find();

        res.status(200).json({success: true, data: explorers});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

// Get Explorer by ID

const getById = async (req, res) => {
    try {
        const explorer = await Explorer.findById(req.params.id);

        if(!explorer) {
            return res.status(404).json({success: false, message: 'Explorer not found.'});
        }

        res.status(200).json({success: true, data: explorer});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

// Get Explorer Explorations

const getExplorerExplorations = async (req, res) => {
    try {
        const explorer = await Explorer.findById(req.params.id);

        if(!explorer) {
            return res.status(404).json({success: false, message: 'Explorer not found.'});
        }

        const explorations = await Exploration.find({explorerId: req.params.id}).populate('locationId');

        res.status(200).json({success: true, explorer: explorer.name, data: explorations});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

// Create or Insert An Explorer

const postExplorer = async (req, res) => {
    try {
        const explorer = new Explorer(req.body);

        await explorer.save();

        res.status(201).json({success: true, message: 'Added a new explorer.', data: explorer});
    } catch (err) {
        res.status(400).json({success: false, message: err.message});
    }
}

const putExplorer = async (req, res) => {
    try{
        const explorer = await Explorer.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, overwrite: true});

        if(!explorer) {
            return res.status(404).json({message: 'Explorer not found.'});
        }

        res.json({message: 'Explorer updated successfuly', data: explorer});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

//  Update Explorer (Partial)

const patchExplorer = async (req, res) => {
    try{
        const explorer = await Explorer.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});

        if(!explorer) {
            return res.status(404).json({message: 'Explorer not found.'});
        }

        res.json({message: 'Explorer updated successfuly', data: explorer});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}


// Delete Explorer

const deleteExplorer = async (req, res) => {
    try {
        const explorer = await Explorer.findByIdAndDelete(req.params.id);

        if(!explorer) {
            return res.status(404).json({message: 'Explorer not found.'});
        }

        res.json({message: 'Explorer deleted successfully', data: explorer})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = {getAllExplorer, getById, getExplorerExplorations, postExplorer, putExplorer, patchExplorer, deleteExplorer};
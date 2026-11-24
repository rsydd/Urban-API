const Exploration = require('../model/exploration.model');

// Get All The Exploration

const getAllExplorations = async (req, res) => {
    try {
        const locationId = req.query;

        const explorations = await Exploration.find({
            locationId : { $regex: locationId || '', $options: 'i' }
        });

        res.status(200).json({success: true, data: explorations});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

// Get Exploration by Id

const getById = async (req, res) => {
    try {
        const exploration = await Exploration.findById(req.params.id);

        if(!exploration) {
            return res.status(404).json({message: 'Exploration not found'});
        }

        res.status(200).json(exploration);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

// Create Exploration

const postExploration = async (req, res) => {
    try {
        const exploration = new Exploration(req.body);

        await exploration.save();

        res.status(201).json({
            success: true, 
            message: "Exploration added successfully",
            data: exploration
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

//  Update Exploration (All)

const putExploration = async (req, res) => {
    try{
        const exploration = await Exploration.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, overwrite: true});

        if(!exploration) {
            return res.status(404).json({message: 'Exploration not found.'});
        }

        res.json({message: 'Exploration updated successfuly', data: exploration});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

//  Update Exploration (Partial)

const patchExploration = async (req, res) => {
    try{
        const exploration = await Exploration.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});

        if(!exploration) {
            return res.status(404).json({message: 'Exploration not found.'});
        }

        res.json({message: 'Exploration updated successfuly', data: exploration});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}


// Delete Exploration 

const deleteExploration = async (req, res) => {
    try {
        const exploration = await Exploration.findByIdAndDelete(req.params.id);

        if(!exploration) {
            return res.status(404).json({message: 'Exploration not found.'});
        }

        res.json({message: 'Exploration deleted successfully', data: exploration})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = {getAllExplorations, getById, postExploration, putExploration, patchExploration, deleteExploration};
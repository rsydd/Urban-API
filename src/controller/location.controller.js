const Location = require('../model/location.model');
const slugify = require('slugify');

// Get Location (All)

const getAllLocations = async (req, res) => {
    try {
        const {name, status, category, country, city} = req.query;

        const locations = await Location.find({
            name: { $regex: name || '', $options: 'i'},
            status: { $regex: status || '', $options: 'i'},
            category: { $regex: category || '', $options: 'i'},
            country: { $regex: country || '', $options: 'i'},
            city: { $regex: city || '', $options: 'i'}
        });

        res.json({success: true, data: locations});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

// Get Location (ID)

const getById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if(!location) {
            res.status(404).json({message: 'Location not found'});
        }

        res.json(location);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

// Get By Slug
const getBySlug = async (req, res) => {
    try {
        const location = await Location.findOne({slug: req.params.slug});

        if(!location) {
            return res.status(404).json({message: 'Location not found'});
        }

        res.json(location);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// Create Location

const postLocation = async (req, res) => {
    try {
        const location = new Location({
            ...req.body,
            slug: slugify(req.body.name, {lower: true}),
        });

        await location.save();

        res.status(201).json({
            success: true, 
            message: "Location added successfully",
            data: location
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

//  Update Location (All)

const putLocation = async (req, res) => {
    try{
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, overwrite: true});

        if(!location) {
            return res.status(404).json({message: 'Location not found.'});
        }

        res.json({message: 'Location updated successfuly', data: location});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

//  Update Location (Partial)

const patchLocation = async (req, res) => {
    try{
        const location = await location.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});

        if(!location) {
            return res.status(404).json({message: 'Location not found.'});
        }

        res.json({message: 'Location updated successfuly', data: location});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

// Delete Location

const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);

        if(!location) {
            return res.status(404).json({message: 'Location not found.'});
        }

        res.json({message: 'Location deleted successfully', data: location})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = {getAllLocations, getById, getBySlug, postLocation, putLocation, patchLocation, deleteLocation};
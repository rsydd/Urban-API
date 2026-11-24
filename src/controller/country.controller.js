const Country = require('../model/country.model');

// Get All of Country

const getAllCountries = async (req, res) => {
    try {
        const country = await Country.find();
        
        res.json({success: true, data: country});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

// Get Country by ID

const getById = async (req, res) => {
    try {
        const country = await Country.findById(req.params.id);

        if(!country) {
            return res.status(404).json({message: 'Country not found'});
        }

        res.json(country);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

// Create Country

const postCountry = async (req, res) => {
    try {
        const country = new Country(req.body);

        await country.save();

        res.status(201).json({
            success: true, 
            message: "Country added successfully",
            data: country
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

//  Update Country (All)

const putCountry = async (req, res) => {
    try{
        const country = await Country.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, overwrite: true});

        if(!country) {
            return res.status(404).json({message: 'Country not found.'});
        }

        res.json({message: 'Country updated successfuly', data: country});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

//  Update Country (Partial)

const patchCountry = async (req, res) => {
    try{
        const country = await Country.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});

        if(!country) {
            return res.status(404).json({message: 'Country not found.'});
        }

        res.json({message: 'Country updated successfuly', data: country});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}


// Delete Country

const deleteCountry = async (req, res) => {
    try {
        const country = await Country.findByIdAndDelete(req.params.id);

        if(!country) {
            return res.status(404).json({message: 'Country not found.'});
        }

        res.json({message: 'Country deleted successfully', data: country})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = {getAllCountries, getById, postCountry, putCountry, patchCountry, deleteCountry};
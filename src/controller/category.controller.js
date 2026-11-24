const Category = require('../model/category.model');
const slugify = require('slugify');

// Get All of Categories

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        
        res.status(200).json({success: true, data: categories});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

// Get Category by Slug

const getBySlug = async (req, res) => {
    try {
        const category = await Category.findOne({slug: req.params.slug});

        if(!category) {
            return res.status(404).json({message: 'Category not found'});
        }

        res.json(category);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// Get Category by ID

const getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if(!category) {
            return res.status(404).json({message: 'Category not found'});
        }

        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

// Create Category

const postCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            slug: slugify(req.body.name, {lower: true}),
            description: req.body.description
        });

        await category.save();

        res.status(201).json({
            success: true, 
            message: "Category added successfully",
            data: category
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

//  Update Category (All)

const putCategory = async (req, res) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, overwrite: true});

        if(!category) {
            return res.status(404).json({message: 'Category not found.'});
        }

        res.json({message: 'Category updated successfuly', data: category});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

//  Update Category (Partial)

const patchCategory = async (req, res) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});

        if(!category) {
            return res.status(404).json({message: 'Category not found.'});
        }

        res.json({message: 'Category updated successfuly', data: category});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}


// Delete Category 

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if(!category) {
            return res.status(404).json({message: 'Category not found.'});
        }

        res.json({message: 'Category deleted successfully', data: category})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = {getAllCategories, getById, getBySlug, postCategory, putCategory, patchCategory, deleteCategory};
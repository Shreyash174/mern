import slugify from 'slugify';
import Product from '../models/ProductModel.js';
import fs from 'fs';

export const CreateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });
        if (!image || image.size > 2000000) return res.status(400).send({ error: 'Image is required and should be less than 2MB' });

        const product = new Product({ ...req.fields, slug: slugify(name) });
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error creating product'
        });
    }
};

// Get all products
export const getProductController = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category').select('-image').limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalcount: products.length,
            message: 'All Products',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error: error.message
        });
    }
};

// Get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).select('-image').populate('category');
        res.status(200).send({
            success: true,
            message: 'Single Product',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting single product',
            error
        });
    }
};

// Get product image
export const ProductImageController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid).select('image');
        if (product.image.data) {
            res.set('Content-Type', product.image.contentType);
            return res.status(200).send(product.image.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting image',
            error
        });
    }
};

// Update product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });
        if (!image || image.size > 2000000) return res.status(400).send({ error: 'Image is required and should be less than 2MB' });

        const product = await Product.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error updating product'
        });
    }
};

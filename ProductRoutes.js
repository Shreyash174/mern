import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { CreateProductController, getProductController, getSingleProductController, ProductImageController, updateProductController } from '../controller/ProductController.js';
import formidable from 'express-formidable';

const router = express.Router();

// Routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), CreateProductController);

// Get products
router.get('/get-product', getProductController);

// Get single product
router.get('/get-product/:slug', getSingleProductController);

// Get product image
router.get('/product-image/:pid', ProductImageController);

// Update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

export default router;

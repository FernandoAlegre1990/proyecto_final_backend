import { getAllProducts, getTopProductsController, getSingleProduct, createProductController, updateProductController, updateProductImageController, deleteProductImage, deleteProductController, productReviewController} from "../controllers/productController.js";
import express from "express";
import {isAdmin, isAuth} from '../middlewares/authMiddleware.js'
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

//routes
//GET ALL PRODUCTS
router.get('/all-products', getAllProducts);

// GET TOP PRODUCTS
router.get("/top", getTopProductsController);

//GET SINGLE PRODUCT
router.get('/:id', getSingleProduct);

// CREATE PRODUCT
router.post("/create", isAuth, isAdmin,  singleUpload, createProductController);

//UPDATE PRODUCT
router.put("/:id", isAuth, isAdmin, updateProductController)

//UPDATE PRODUCT IMAGE
router.put("/image/:id", isAuth, isAdmin, singleUpload, updateProductImageController)

//DELETE PRODUCT IMAGE
router.delete("/delete-image/:id", isAuth, isAdmin, deleteProductImage)

//DELETE PRODUCT
router.delete("/delete/:id", isAuth, isAdmin, deleteProductController)

// REVIEW PRODUCT
router.put("/:id/review", isAuth, productReviewController);



export default router;


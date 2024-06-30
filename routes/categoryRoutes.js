import express from 'express'

import {isAuth, isAdmin} from '../middlewares/authMiddleware.js';
import { createCategory, getAllCategories, deleteCategory, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

//CREATE CATEGORY
router.post('/create', isAuth, isAdmin, createCategory)

//GET ALL CATEGORIES
router.get('/all', isAuth, getAllCategories)

//DELETE CATEGORY
router.delete('/delete/:id', isAuth, isAdmin, deleteCategory)

//UPDATE CATEGORY
router.put('/update/:id', isAuth, isAdmin, updateCategory)


export default router;
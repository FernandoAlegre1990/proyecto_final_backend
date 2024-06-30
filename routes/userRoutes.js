import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  registerController,
  passwordResetController,
  udpatePasswordController,
  updateProfileController,
  updateProfilePicController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router()

//routes
//register
router.post('/register', registerController)

//login
router.post("/login", loginController)

//profile
router.get('/profile', isAuth, getUserProfileController)

//logout
router.get('/logout', isAuth, logoutController)

//update profile
router.put('/profile-update', isAuth, updateProfileController)

//update password
router.put('/update-password', isAuth, udpatePasswordController)

//update profile Pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);
// FORGOT PASSWORD
router.post("/reset-password", passwordResetController);

//export
export default router
import { isAuth, isAdmin} from "../middlewares/authMiddleware.js";
import { createOrderController, getMyOrdersController, singleOrderDetailsController, paymentController, getAllOrdersController, changeOrderStatusController } from "../controllers/orderController.js";
import express from 'express'

const router = express.Router();

//CREATE ORDER  
router.post("/create", isAdmin, isAuth, createOrderController)

//GET ALL ORDERS
router.get("/my-orders", isAuth, getMyOrdersController)

//  GET SINGLE ORDER DETAILS
router.get("/my-orders/:id",isAdmin, isAuth, singleOrderDetailsController);

//ACCEPT PAYMENTS
router.post("/payment", isAdmin, isAuth, paymentController)

//ADMIN
router.get("/admin/orders", isAuth, isAdmin, getAllOrdersController)

//Change order status
router.put("/admin/orders/:id", isAuth, isAdmin,changeOrderStatusController)

export default router
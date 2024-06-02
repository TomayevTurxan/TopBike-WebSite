import { Router } from "express";
import { GetAllShippingItems, shippingPost } from "../../controller/HomeController/shippingController.js";
const shippingRouter = Router();

shippingRouter.post('/shipping', shippingPost);
shippingRouter.get('/shipping', GetAllShippingItems);

export default shippingRouter;
import { Router } from "express";
import { GetAllNavbarItems, navbarPost } from "../../controller/HomeController/navbarController.js";
const navbarRouter = Router();

navbarRouter.post('/navbar', navbarPost);
navbarRouter.get('/navbar', GetAllNavbarItems);

export default navbarRouter;
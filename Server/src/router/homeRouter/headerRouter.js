import { Router } from "express";
import { GetAllHeaderItems, headerPost } from "../../controller/HomeController/headerController.js";
const headerRouter = Router();

headerRouter.post('/header', headerPost);
headerRouter.get('/header', GetAllHeaderItems);

export default headerRouter;
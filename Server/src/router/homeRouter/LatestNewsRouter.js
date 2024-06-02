import { Router } from "express";
import { GetAlllatestNewsItems, latestNewsPost } from "../../controller/HomeController/latestNewsController.js";
const latestNewsRouter = Router();

latestNewsRouter.post('/latestNews', latestNewsPost);
latestNewsRouter.get('/latestNews', GetAlllatestNewsItems);

export default latestNewsRouter;
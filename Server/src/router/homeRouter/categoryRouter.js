import { Router } from 'express';
import { getAllCategoryItems, categoryPost } from '../../controller/HomeController/categoryController.js';
import { upload } from '../../middleware/categoryUpload.js';

const categoryRouter = Router();

categoryRouter.post('/category', upload.single('image'), categoryPost);
categoryRouter.get('/category', getAllCategoryItems);

export default categoryRouter;



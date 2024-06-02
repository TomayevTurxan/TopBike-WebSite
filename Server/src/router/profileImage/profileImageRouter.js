import { Router } from "express";
import { upload } from "../../middleware/categoryUpload.js";
import { postProfileImage } from "../../controller/profileImage/prfileImageController.js";
const profileImageRouter = Router();

profileImageRouter.post('/user/:userId/addProfileImage', upload.single('image'), postProfileImage);
// profileImageRouter.get('/products', GetAllproductItems);
// profileImageRouter.get('/products/:id', getProductById);
// profileImageRouter.delete('/products/:id', deleteProduct);
// profileImageRouter.put('/products/:id', upload.single('img'), updateProduct);

export default profileImageRouter;
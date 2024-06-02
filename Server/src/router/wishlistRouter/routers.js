import { Router } from "express";
import { addToWishlist, deleteDataFromWishlist, getWishlistData } from "../../controller/wihslitController/controller.js";
const wishlistRouter = Router();

wishlistRouter.get('/users/:userId/wishlist', getWishlistData);
wishlistRouter.post('/users/:userId/addWishlist', addToWishlist);
wishlistRouter.delete("/users/:userId/deletewish", deleteDataFromWishlist);

export default wishlistRouter;
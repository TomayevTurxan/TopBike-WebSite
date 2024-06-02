import { User } from "../../model/UserModel/Model.js";

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId } = req.body;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).send("User not found");
        }

        const product = user.wishlist.find(x => x.product._id == productId);

        if (product) {
            user.wishlist = user.wishlist.filter(item => !item.product._id.equals(productId));
            await user.save();
            res.status(201).send("Product Deleted from Wishlist");
            return;
        }

        user.wishlist.push({ product: productId });
        await user.save();
        res.status(200).send('Added To Wishlist');
    } catch (error) {
        res.status(500).send(error.message);
    }
};




export const getWishlistData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('wishlist.product');
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user.wishlist);
    } catch (error) {
        res.status(500).send(error.message)
    }
}



export const deleteDataFromWishlist = async (req, res) => {
    try {
        const userId = req.params.userId
        const { productId } = req.body
        const user = await User.findById(userId).populate('wishlist.product')
        if (!user) {
            res.status(404).send("User Not Found")
            return
        }
        user.wishlist = user.wishlist.filter(item => !item.product._id.equals(productId));
        await user.save()
        res.status(200).send("Product Deleted")

    } catch (error) {
        res.status(500).send(error.message)
    }
}
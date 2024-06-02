import { Products } from "../../model/HomeModel/productsModel.js"
import { User } from "../../model/UserModel/Model.js"
import cloudinary from "../../utils/categoriesCloudinary.js"


// POST
export async function productPost(req, res) {
    const img = req.file.path
    try {
        const result = await cloudinary.uploader.upload(img, {
            folder: 'products'
        })
        const product = new Products({
            img: result.secure_url,
            ...req.body
        })
        await product.save()
        res.status(200).send('productItems Created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}


// DELETE
export async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        const product = await Products.findById(id);
        if (product) {
            await User.updateMany(
                {},
                {
                    $pull: {
                        'basket': { product: product._id },
                        'wishlist': { product: product._id }
                    }
                }
            );

            await Products.findByIdAndDelete(id);

            res.status(200).json({ message: "Product deleted" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// UPDATE

export async function updateProduct(req, res) {
    const { id } = req.params;

    try {
        if (req.file) {
            const img = req.file.path;
            const result = await cloudinary.uploader.upload(img);
            await Products.findByIdAndUpdate(id, {
                img: result.secure_url,
                ...req.body
            });
        } else {
            await Products.findByIdAndUpdate(id, req.body);
        }

        res.status(200).json({ message: "Product updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server connection error!!!" });
    }
};


// GET ALL
export async function GetAllproductItems(req, res) {
    try {
        const items = await Products.find({}).populate("commentsCollection.comment")
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// get product by id
export async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).json({ message: "not found!!!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server connection error!!!" });
    }
};


// GET LATEST 8 PRODUCT 
export async function latestProducts(req, res) {
    try {
        const latestProducts = await Products.find({})
            .sort({ createdAt: -1 })
            .limit(8);
        res.status(200).send(latestProducts)
    } catch (error) {
        res.status(500).send("error");
    }
}
import { User } from "../../model/UserModel/Model.js";

export const addToBasket = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId } = req.body
        const user = await User.findById(userId).populate('basket.product')
        if (!user) {
            return res.status(404).send("User not found");
        }
        const product = user.basket.find(x => x.product._id.toString() === productId.toString())
        if (product) {
            product.count++
            await user.save()
            res.status(201).send("Product Already Exist. Count Increased")
            return
        }
        user.basket.push({ product: productId })
        await user.save()
        res.status(200).send('Added To Basket')
    } catch (error) {
        res.status(500).send(error.message)
    }
};



export const getBasketData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('basket.product');
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user.basket);
    } catch (error) {
        res.status(500).send(error.message)
    }
}



export const deleteDataFromBasket = async (req, res) => {
    try {
        const userId = req.params.userId
        const { productId } = req.body
        const user = await User.findById(userId).populate('basket.product')
        if (!user) {
            res.status(404).send("User Not Found")
            return
        }
        user.basket = user.basket.filter(x => x._id.toString() !== productId)
        await user.save()
        res.status(200).send("Product Deleted")

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteAllBasket = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId).populate('basket.product')
        if (!user) {
            res.status(404).send("User Not Found")
            return
        }
        user.basket = []
        await user.save()
        res.status(200).send("Basket Deleted")

    } catch (error) {
        res.status(500).send(error.message)
    }
}




// INCREASE COUNT
export const increaseCount = async (req, res) => {
    try {
        const userId = req.params.userId
        const { productId } = req.body
        const user = await User.findById(userId).populate('basket.product')
        if (!user) {
            res.status(404).send("User Not Found!!!")
            return
        }
        const product = user.basket.find(x => x._id == productId)
        if (product) {
            product.count++
            await user.save()
            res.status(200).send('Count Increased')
        } else {
            res.status(404).send("Product Not Found")
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}

// DECREASE COUNT
export const decreaseCount = async (req, res) => {
    try {
        const userId = req.params.userId
        const { productId } = req.body
        const user = await User.findById(userId).populate('basket.product')
        if (!user) {
            res.status(404).send("User Not Found!!!")
            return
        }
        const product = user.basket.find(x => x._id == productId)
        if (product) {
            if (product.count === 1) {
                res.status(201).send('product count must be minumum 1!!!')
                return
            }
            product.count--
            await user.save()
            res.status(200).send('Count Decreased')
        } else {
            res.status(404).send("Product Not Found")
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}
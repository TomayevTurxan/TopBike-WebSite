import { Shipping } from "../../model/HomeModel/shippingModel.js"

export async function shippingPost(req, res) {
    try {
        const shipping = new Shipping(req.body)
        await shipping.save()
        res.status(200).send('shipping Items Created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export async function GetAllShippingItems(req, res) {
    try {
        const shipping = await Shipping.find({})
        res.status(200).send(shipping)
    } catch (error) {
        res.status(500).send(error.message)
    }

}
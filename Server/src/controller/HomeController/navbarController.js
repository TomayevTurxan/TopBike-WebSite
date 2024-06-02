import { Navbar } from "../../model/HomeModel/navbarModel.js"

export async function navbarPost(req, res) {
    try {
        const navbar = new Navbar(req.body)
        await navbar.save()
        res.status(200).send('navbar Created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export async function GetAllNavbarItems(req, res) {
    try {
        const items = await Navbar.find({})
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error.message)
    }

}
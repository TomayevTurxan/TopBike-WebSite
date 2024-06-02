import { Header } from "../../model/HomeModel/headerModel.js"

export async function headerPost(req, res) {
    try {
        const header = new Header(req.body)
        await header.save()
        res.status(200).send('headerItems Created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export async function GetAllHeaderItems(req, res) {
    try {
        const items = await Header.find({})
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error.message)
    }

}
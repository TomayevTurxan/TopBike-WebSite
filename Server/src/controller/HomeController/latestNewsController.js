import { latestNews } from "../../model/HomeModel/LatestNewsModel.js"

export async function latestNewsPost(req, res) {
    try {
        const item = new latestNews(req.body)
        await item.save()
        res.status(200).send('Items Created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export async function GetAlllatestNewsItems(req, res) {
    try {
        const items = await latestNews.find({})
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error.message)
    }

}
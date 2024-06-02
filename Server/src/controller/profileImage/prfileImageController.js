import { User } from "../../model/UserModel/Model.js"
import { Image } from "../../model/profileImage/profileimageModel.js"
import cloudinary from "../../utils/categoriesCloudinary.js"

export async function postProfileImage(req, res) {
    const image = req.file.path
    const { userId } = req.params
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: 'topBikeprofileImages'
        })
        const profileImage = new Image({
            img: result.secure_url,
        })
        await profileImage.save()
        const user = await User.findByIdAndUpdate(userId, {
            profileImg: result.secure_url
        })
        await user.save()
        res.status(200).send('profile Image Created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}


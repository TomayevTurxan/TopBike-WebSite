import Category from '../../model/HomeModel/categoryModel.js';
import cloudinary from '../../utils/categoriesCloudinary.js';

export async function categoryPost(req, res) {
  const { buttonText } = req.body;
  const image = req.file.path
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'products'
    })
    const newPost = new Category({
      buttonText,
      image: result.secure_url

    });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllCategoryItems(req, res) {
  try {
    const items = await Category.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

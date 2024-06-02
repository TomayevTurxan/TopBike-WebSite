import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    image: { type: String },
    buttonText: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model('topBikecategory', categorySchema);

export default Category;

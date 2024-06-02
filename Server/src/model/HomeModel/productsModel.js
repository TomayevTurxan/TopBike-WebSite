import mongoose from "mongoose";

const { Schema } = mongoose;

const bikeProductSchema = new Schema(
    {
        img: [{ type: String }],
        title: { type: String },
        oldPrice: { type: Number },
        newPrice: { type: Number },
        sale: { type: Boolean },
        basketIcon: { type: String },
        heartIcon: { type: String },
        addedHeartIcon: { type: String },
        eyeIcon: { type: String },
        category: { type: String },
        color: { type: String },
        size: { type: String },
        commentsCollection: [
            {
                comment: { type: mongoose.Schema.Types.ObjectId, ref: "topBikeComments" },
            }
        ]

    },
    { timestamps: true }
);

export const Products = mongoose.model("bikeProductSchema", bikeProductSchema);
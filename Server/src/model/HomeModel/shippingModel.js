import mongoose from "mongoose";

const { Schema } = mongoose;

const shippingSchema = new Schema(
    {
        img: { type: String },
        title: { type: String },
        description: { type: String }
    },
    { timestamps: true }
);

export const Shipping = mongoose.model("topBikeShipping", shippingSchema);
import mongoose from "mongoose";

const { Schema } = mongoose;

const headerSchema = new Schema(
    {
        bgImg: { type: String },
        headText: { type: String },
        description: { type: String },
        buttonText: { type: String }
    },
    { timestamps: true }
);

export const Header = mongoose.model("topBikeHeader", headerSchema);
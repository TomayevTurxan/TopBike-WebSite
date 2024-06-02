import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema(
    {
        imageURL: { type: String }
    }
);

export const Image = mongoose.model("topBikeProfileImage", imageSchema);
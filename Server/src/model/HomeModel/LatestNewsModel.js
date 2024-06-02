import mongoose from "mongoose";

const { Schema } = mongoose;

const latestNewsSchema = new Schema(
    {
        bgImg: { type: String },
        news: { type: String },
        title: { type: String },
        description: { type: String },
        read: { type: String }
    },
    { timestamps: true }
);

export const latestNews = mongoose.model("topBikeLatestNews", latestNewsSchema);
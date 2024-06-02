import mongoose from "mongoose";

const { Schema } = mongoose;

const navbarSchema = new Schema(
    {
        logo: { type: String },
        navTexts: [{ type: String }],
        navIcons: [{ type: String }],
        hot: { type: Boolean }
    },
    { timestamps: true }
);

export const Navbar = mongoose.model("TopBike", navbarSchema);
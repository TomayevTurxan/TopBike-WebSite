
import mongoose, { model } from 'mongoose'

const { Schema } = mongoose
const TopBikeUserSchema = new Schema({
    email: { type: String },
    password: { type: String },
    role: { type: String, required: true },
    profileImg: {
        type: String
    },
    basket: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "bikeProductSchema" },
            count: { type: Number, default: 1 }

        }
    ],
    wishlist: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "bikeProductSchema" }
        }
    ]

}, { timestamps: true })

export const User = model('topBikeUser', TopBikeUserSchema)


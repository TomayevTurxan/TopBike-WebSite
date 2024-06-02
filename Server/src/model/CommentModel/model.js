import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentModel = new Schema(
    {
        from: { type: Object },
        text: { type: String },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bikeProductSchema', // reference to the Product model
        },
        replies: [
            {
                text: { type: String },
                from: { type: Object },
                likes: [
                    {
                        from: { type: Object }
                    }
                ]
            }
        ],
        likes: [
            {
                from: { type: Object }
            }
        ]
    },
    { timestamps: true }
);

const Comment = mongoose.model('topBikeComments', commentModel);

export default Comment;

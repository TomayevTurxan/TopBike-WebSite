import jwt from 'jsonwebtoken';
import Comment from '../../model/CommentModel/model.js';
import { Products } from '../../model/HomeModel/productsModel.js';
import nodemailer from "nodemailer"
const PrivateKey = "wexvlj@!@#$!__++=";



// ---------------------------------COMMENT------------------------------------------

export async function postComment(req, res) {
    try {
        const { productId, } = req.params
        const { text } = req.body
        const product = await Products.findById(productId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        const comment = new Comment({
            text: text,
            from: decoded,
            productId,
        })
        await comment.save()
        product.commentsCollection.push({ comment: comment._id });
        await product.save()
        res.status(201).send('comment created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCommentById(req, res) {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId).populate("commentsCollection.comment")
        res.send(comment);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

export async function getAllCommentsOfProduct(req, res) {
    try {
        const { productId } = req.params
        const product = await Products.findById(productId).populate("commentsCollection.comment")
        res.status(200).send(product.commentsCollection);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getAllComments(req, res) {
    try {
        const comments = await Comment.find({}).populate('productId')
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteComment(req, res) {
    try {
        const { commentId } = req.params
        const { userId, productId } = req.body
        const product = await Products.findById(productId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!product) {
                res.status(404).send("Product Not Found")
                return
            }

            // await Products.updateMany(
            //     {},
            //     {
            //         $pull: {
            //             'commentsCollection': { comment: commentId },
            //         }
            //     }
            // );
            product.commentsCollection = product.commentsCollection.filter(x => x.comment._id.toString() !== commentId.toString())
            await Comment.findByIdAndDelete(commentId)
            await product.save()
            res.status(200).send('Comment Deleted')
        } else {
            res.status(406).send('You do not have access to delete Comment')
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function updateComment(req, res) {
    try {
        const { commentId } = req.params
        const { userId, productId, text } = req.body
        const product = await Products.findById(productId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!product) {
                res.status(404).send("Product Not Found")
                return
            }
            const findedComment = product.commentsCollection.find(x => x._id.toString() === commentId)
            findedComment.text = text
            await product.save()
            res.status(200).send('Comment Updated')
        } else {
            res.status(406).send('You have not access to update Comment')
        }

    } catch (error) {
        res.status(500).send(error.message);

    }
}



export const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const { userId } = req.body
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        const comment = await Comment.findById(commentId)
        const findedLike = comment.likes.find(x => x.from._id === userId)
        if (findedLike) {
            comment.likes = comment.likes.filter((item) => item.from._id !== userId)
            await comment.save()
            res.status(201).send('Like removed successfully!')
        } else {
            comment.likes.push({ from: decoded })
            await comment.save()
            res.status(200).send('Like added successfully!')
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



// ---------------------------------REPLY------------------------------------------

export const replyComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const { text } = req.body
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        const comment = await Comment.findById(commentId)
        if (comment) {
            comment.replies.push({ text, from: decoded })
            await comment.save();
            res.status(201).send("reply added");
        } else {
            res.status(404).send('comment not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const getAllRepliesOfComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const comment = await Comment.findById(commentId)
        res.status(200).send(comment.replies)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function deleteReply(req, res) {
    try {
        const { replyId } = req.params
        const { userId, commentId } = req.body
        const comment = await Comment.findById(commentId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!comment) {
                res.status(404).send("Comment Not Found")
                return
            }
            comment.replies = comment.replies.filter(x => x._id.toString() !== replyId)
            await comment.save()
            res.status(200).send('Reply Deleted')
        } else {
            res.status(406).send('You have not access to delete Reply')
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function updateReply(req, res) {
    try {
        const { replyId } = req.params
        const { userId, commentId, text } = req.body
        const comment = await Comment.findById(commentId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!comment) {
                res.status(404).send("Reply Not Found")
                return
            }
            const findedReply = comment.replies.find(x => x._id.toString() === replyId)
            findedReply.text = text
            await comment.save()
            res.status(200).send('Reply Updated')
        } else {
            res.status(406).send('You have not access to update Reply')
        }
    } catch (error) {
        res.status(500).send(error.message);

    }
}

export const likeReply = async (req, res) => {
    try {
        const { commentId } = req.params
        const { replyId, userId } = req.body
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        const comment = await Comment.findById(commentId)
        const reply = comment.replies.find(x => x._id.toString() === replyId)
        const findedLike = reply.likes.find(x => x.from._id === userId)
        if (findedLike) {
            reply.likes = reply.likes.filter((item) => item.from._id !== userId)
            await comment.save()
            res.status(201).send('Like removed successfully!')
        } else {
            reply.likes.push({ from: decoded })
            await comment.save()
            res.status(200).send('Like added successfully!')
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const sendEmailForReply = async (req, res) => {
    const { from_email, to_email, text, product, comment } = req.body;

    if (!from_email || !to_email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: "ilkin656.u@gmail.com",
            pass: "ttkn adpd nykx ryuf",
        },
    });

    const mailOptions = {
        from: 'ilkin656.u@gmail.com',
        to: to_email,
        subject: 'Comment reply',
        html: `
        <h1 style="color:orange;text-align:center;">TopBike Services</h1>
      <p style="font-size:16px">${from_email} added new  reply for your comment.</p><br></br>
      <p style="font-size:14px"> Your comment: "${comment}"</p>
      <p style="font-size:14px"> Reply text: "${text}"</p>
      <p style="font-size:14px"> Product Name: "${product}"</p><br></br>
      <p>Thanks for Comment &#x1F60A;</p>
      <p>Good Luck &#x1F60A;</p>
      `
    };

    try {
        await transporter.sendMail(mailOptions)
        res.status(200).send("Email  sent");
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email.' });
    }
}



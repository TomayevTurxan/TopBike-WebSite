import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../model/UserModel/Model.js";
import cloudinary from "../../utils/categoriesCloudinary.js";
import nodemailer from "nodemailer"
const PrivateKey = "wexvlj@!@#$!__++=";

const verificationCodes = {};




// ----------------------REGISTER-----------------------------

export async function register(req, res) {
    try {
        const hashedPassword = await hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            role: "user",
        });
        await user.save();
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role, profileImg: user.profileImg },
            PrivateKey
        );
        res.status(200).send(token);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}



// --------------------------CHECK USER--------------------------------------------

export const checkUser = async (req, res) => {
    try {
        const { email } = req.body
        const findedUser = await User.findOne({ email });
        if (findedUser) {
            res.status(406).send("Email Alredy Exist!")
        } else {
            res.status(200).send("Email Verification Sent")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


// --------------------------LOGIN--------------------------------------------

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user && (await compare(password, user.password))) {
            const token = jwt.sign(
                { _id: user._id, email: user.email, role: user.role, profileImg: user.profileImg },
                PrivateKey
            );
            res.status(200).send(token);
        } else {
            res.status(403).send("Wrong details!!!");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// --------------------------DELETE--------------------------------------------

export async function deleteUser(req, res) {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded) {
            if (decoded.role === "admin") {
                const { id } = req.params;
                const user = await User.findByIdAndDelete(id);
                if (user) {
                    res.status(200).send("User Deleted");
                } else {
                    res.status(404).send("User Not Found");
                }
            } else {
                res.status(403).send("You have not acces to delete user");
            }
        } else {
            res.status(403).send("You have not acces to delete user");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// --------------------------UPDATE USER--------------------------------------------

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === "admin" || decoded._id === id) {
            const hashedPassword = await hash(req.body.password, 10);
            await User.findByIdAndUpdate(id, {
                email: req.body.email,
                password: hashedPassword,
            });
            res.status(200).send("user updated");
        } else {
            res.status(404).send("You have not access to update");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// --------------------------GET ALL USERS--------------------------------------------

export async function getAllUsers(req, res) {
    try {
        const users = await User.find({})
            .populate('basket.product')
            .populate('wishlist.product')
            .populate({
                path: 'basket.product.commentsCollection.comment',
                model: 'topBikeComments' // Replace 'Comment' with the actual model name for comments
            })
            .populate({
                path: 'wishlist.product.commentsCollection.comment',
                model: 'topBikeComments' // Replace 'Comment' with the actual model name for comments
            });
        res.send(users);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// --------------------------GET  USER ById--------------------------------------------

export async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('wishlist.product')
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}


// --------------------------VERIFICATION CODE--------------------------------------------
export const sendVerificationCode = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }
    const code = Math.floor(1000 + Math.random() * 9000);
    verificationCodes[email] = code;

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
        to: email,
        subject: 'Email Verification Code',
        text: `Hello`,
        html: `
        <h1 style="color:orange;text-align:center;">TopBike Services</h1>
        <b style="font-size:20px"> <span style="color:red">Warning!!</span> Do Not Share This  Code with Anyone!!!</b><br/>
      <i style="font-size:16px">Your Email Verification Code is : <b style="color:red">${code}</b></i>
      <p>Thanks for Registration &#x1F60A;</p>
      <p>Good Luck &#x1F60A;</p>
      `
    };

    try {
        await transporter.sendMail(mailOptions)
        res.status(200).send("Email verification code sent");
    } catch (error) {
        res.status(500).json({ error: 'Failed to send verification code via email.' });
    }
}




// --------------------------VERIFY EMAIL--------------------------------------------

export const verifyEmail = (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) {
        return res.status(400).json({ error: 'Email and verification code are required.' });
    }
    const storedCode = verificationCodes[email];
    if (!storedCode || parseInt(code) !== storedCode) {
        return res.status(401).json({ error: 'Invalid verification code.' });
    }
    delete verificationCodes[email];
    res.status(200).send('Email verified successfully.');
}


// --------------------------RESET PASSWORD-------------------------------------------

export const resetPassword = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        const newHashedPassword = await hash(password, 10)
        if (!user) {
            return res.status(404).send("User not found")
        }
        user.password = newHashedPassword
        await user.save()
        res.status(200).send("User password updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

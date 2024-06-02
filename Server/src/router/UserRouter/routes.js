import { Router } from "express";
const userRouter = Router();
import { checkUser, deleteUser, getAllUsers, getUserById, login, register, resetPassword, sendVerificationCode, updateUser, verifyEmail } from "../../controller/UserController/controller.js";
import { upload } from "../../middleware/categoryUpload.js";

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/register", register);
userRouter.post("/checkUser", checkUser);
userRouter.post("/login", login);
userRouter.delete("/users/:id", deleteUser);
userRouter.put("/users/:id", updateUser);

userRouter.post("/sendVerificationCode", sendVerificationCode);
userRouter.post("/verifyEmail", verifyEmail);
userRouter.post("/resetPassword", resetPassword);

export default userRouter;
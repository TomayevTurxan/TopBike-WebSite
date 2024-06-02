import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import navbarRouter from "./src/router/homeRouter/navbarRouter.js";
import headerRouter from "./src/router/homeRouter/headerRouter.js";
import shippingRouter from "./src/router/homeRouter/ShippingRouter.js";
import productRouter from "./src/router/homeRouter/productsRouter.js";
import categoryRouter from "./src/router/homeRouter/categoryRouter.js";
import latestNewsRouter from "./src/router/homeRouter/LatestNewsRouter.js";
import userRouter from "./src/router/UserRouter/routes.js";
import basketRouter from "./src/router/basketRouter/routers.js";
import wishlistRouter from "./src/router/wishlistRouter/routers.js";
import profileImageRouter from "./src/router/profileImage/profileImageRouter.js";
import commentRouter from "./src/router/CommentRouter/router.js";
import bodyParser from "body-parser";
import Stripe from "stripe";
import dotenv from "dotenv";
const port = 7000;

const app = express();
app.use(cors());
app.use(json());
app.use(express.static("./src/uploads"));

const stripe = new Stripe(process.env.SECRET_KEY);
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", navbarRouter);
app.use("/", headerRouter);
app.use("/", shippingRouter);
app.use("/", productRouter);
app.use("/", categoryRouter);
app.use("/", latestNewsRouter);
app.use("/", basketRouter);
app.use("/", userRouter);
app.use("/", wishlistRouter);
app.use("/", profileImageRouter);
app.use("/", commentRouter);

app.post("/payment", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});

connect(process.env.SECRET_KEY_API).catch((error) =>
  console.log("db not connect" + error)
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

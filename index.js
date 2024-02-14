const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const Product = require('./models/product');
const Cart = require('./models/cart');

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();

const PORT = process.env.PORT || 8000;

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => console.log("MongoDB connected...."));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
    const allProducts = await Product.find({});
    res.render("home", {
        user: req.user,
        products: allProducts,
    });
});

app.get("/hoodies", async (req, res) => {
    const hoodies = await Product.find({tag: {$eq: "Hoodie"}});
    res.render("home", {
        user: req.user,
        products: hoodies,
    });
});

app.get("/sweatshirts", async (req, res) => {
    const sweatshirts = await Product.find({tag: {$eq: "Sweatshirt"}});
    res.render("home", {
        user: req.user,
        products: sweatshirts,
    });
});

app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
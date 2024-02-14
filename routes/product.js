const { Router } = require("express");
const multer = require('multer');
const path = require("path");
const Product = require('../models/product');
const Comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const upload = multer({ storage: storage })


router.get("/add-product", (req, res) => {
    return res.render('addProduct', {
        user: req.user,
    });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ productId: req.params.id }).populate("createdBy");
//   console.log("product", product);
  // console.log("Comments", comments);
  return res.render("product", {
    user: req.user,
    product,
    comments,
  });
});

router.post('/comment/:productId', async (req, res) => {
   await Comment.create({
    content: req.body.content,
    productId: req.params.productId,
    createdBy: req.user._id,
  });
  return res.redirect(`/product/${req.params.productId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    const { productName, productDescription, tag, price, productHighlights, color } = req.body;
    const product = await Product.create({
        productName,
        tag,
        productDescription,
        price,
        productHighlights,
        color,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/product/${product._id}`);
});

module.exports = router;
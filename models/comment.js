const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });

const Comment = model("comment", commentSchema);

module.exports = Comment;
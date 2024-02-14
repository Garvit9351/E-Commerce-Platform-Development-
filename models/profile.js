const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: true,
    },
    fullAddress: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });

const Profile = model("profile", profileSchema);

module.exports = Profile;
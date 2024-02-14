const { Router } = require("express");
const User = require("../models/user");
const Profile = require("../models/profile");

const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body; 
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email and Password",
        });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});

router.get("/updateprofile", (req, res) => {
    return res.render("updateProfile", {
        user: req.user,
    });
});

router.post("/updateprofile", async (req, res) => {
    const { firstName, lastName, mobileNumber, city, pincode, state, fullAddress, gender } = req.body;
    await Profile.create({
        firstName,
        lastName,
        mobileNumber,
        city,
        pincode,
        state,
        fullAddress,
        gender,
        createdBy: req.user._id,
    });
    return res.redirect("/user/profile");
});

router.get("/profile", async (req, res) => {
    const userProfile = await Profile.findOne({createdBy: req.user});
    // console.log("Abhishek", userProfile);
    return res.render("profile", {
        user: req.user,
        profileDetails: userProfile,
    });
});

module.exports = router;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");

const User = require("../models/userModel");

const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res) => {
    const {username, password} = req.body;
    
    const loginUser = await User.findOne({username: username});
    if (!loginUser) {
        return res.status(400).json({error: "Username not recognized"});
    }

    const passCheck = loginUser ? await bcrypt.compare(password, loginUser.passwordHash) : false;
    if (!passCheck) {
        return res.status(400).json({error: "Invalid credentials"});
    }

    const payload = {
        username: loginUser.username,
        id: loginUser._id
    }
    const token = jwt.sign(payload, config.jwtSecret);

    const tokenPayload = {
        token,
        username: loginUser.username,
        name: loginUser.name,
    }

    return res.status(200).json(tokenPayload)

})

module.exports = loginRouter;
//Libraries
const bcrypt = require("bcrypt");

//Setup
const userRouter = require("express").Router();
const User = require("../models/userModel");

userRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("playlists", {user: 0})
    res.status(200).json(users)
})

userRouter.post("/", async (req, res) => {
        const {username, name, password} = req.body;

        if (!password || password.length < 4) {
           return res.status(400).json({error: "Password is required and must be at least 4 characters."});
        }
        
        // hashing the password
        const passwordHash = await bcrypt.hash(password, 10);
    
        const newUser = new User({
            username,
            name,
            passwordHash,
        });
        
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);  
})

module.exports = userRouter;

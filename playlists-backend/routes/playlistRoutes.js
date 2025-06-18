const express = require("express");
const playlistRouter = express.Router();

const jwt = require("jsonwebtoken");

const Playlist = require("../models/playlistModel.js");
const config = require("../utils/config");
const User = require("../models/userModel.js");

const extractToken = (req) => {
    const token = req.get("authorization");
    if (!token) return false;
    return token.startsWith("Bearer ") ? token.slice(7) : false;
}

playlistRouter.get("/", async (req, res) => {
    try {
        const playlists = await Playlist.find({}).populate("user", { passwordHash: 0, playlists: 0 });
        res.json(playlists);
    } catch (error) {
        next(error);
    }
});

playlistRouter.post("/", async (req, res) => {
    const { name, creator, numOfSongs, likes } = req.body;

    const extractedToken = extractToken(req);
    if (!extractedToken) {
        res.status(401).json({ error: "JWT token not provided" });
    }

    const authorizeCheck = jwt.verify(extractedToken, config.jwtSecret);

    if (!authorizeCheck.id) {
        res.status(401).json({ error: "User not authorized" })
    }

    const foundUser = await User.findById(authorizeCheck.id);
    if (!foundUser) {
        return res.status(400).json({ error: "User not found" })
    }

    // Creation of playlist
    const playlist = new Playlist({
        name,
        creator,
        numOfSongs,
        likes: likes || 0,
        isEnabled: true,
        user: foundUser
    });
    const savedPlaylist = await playlist.save();

    // Updating the user's playlist array
    foundUser.playlists = [...foundUser.playlists, savedPlaylist._id];
    await foundUser.save();

    res.status(201).json(savedPlaylist);
});

// Specifically for liking playlists
playlistRouter.put("/likes/:id", async (req, res) => {
    const { name, creator, numOfSongs, likes, isEnabled, user } = req.body;
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        req.params.id,
        { name, creator, numOfSongs, likes: likes + 1, isEnabled, user: user._id }
    );
    const savedPlaylist = await updatedPlaylist.save();
    res.status(201).json(savedPlaylist);
});

// For toggling playlists
playlistRouter.put("/toggle/:id", async (req, res) => {
    const { name, creator, numOfSongs, likes, isEnabled, user } = req.body;
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        req.params.id,
        { name, creator, numOfSongs, likes, isEnabled: !isEnabled, user: user._id }
    );
    const savedPlaylist = await updatedPlaylist.save();
    res.status(201).json(savedPlaylist);
});

playlistRouter.delete("/:id", async (req, res) => {

    const extractedToken = extractToken(req);
    if (!extractedToken) {
        return res.status(401).json({ error: "JWT token not provided" });
    }

    const authorizeCheck = jwt.verify(extractedToken, config.jwtSecret);
    if (!authorizeCheck.id) {
        res.status(401).json({ error: "User not authorized" })
    }

    const playlist = await Playlist.findById(req.params.id);
    const foundUser = await User.findById(authorizeCheck.id);

    if (!playlist) {
        return res.status(400).json({ error: "Playlist not found" });
    }
    else if (!foundUser) {
        return res.status(400).json({ error: "User not found" });
    }
    else if (foundUser._id.toString() !== playlist.user.toString()) {
        return res.status(400).json({ error: "Invalid user id" });
    }
    else {
        // Eliminate from user's list
        foundUser.playlists = foundUser.playlists.filter((p) => p.toString() !== req.params.id.toString());
        await foundUser.save();

        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: `The playlist [${deletedPlaylist.name}] deleted successfully.` });
    }
})

module.exports = playlistRouter;
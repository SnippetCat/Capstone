const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

//middlewares
const requestLogger = require("./utils/logger");
const errorHandler = require("./utils/errorHandler");

//configs
const config = require("./utils/config.js");

//movie routing
const playlistRouter = require("./routes/playlistRoutes");
const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/login");

mongoose.set("strictQuery", false);
const dbURI = config.dbUri;
mongoose.connect(dbURI)
        .then(() => console.log("DB connection established"))
        .catch((e) => console.log("DB connection failed: ", e.message));

app.use(express.json());
app.use(express.static("dist"));
app.use(requestLogger);
app.use(cors());  

app.use("/api/playlists", playlistRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);


app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Whats up");
});

module.exports = app;
require("dotenv").config();

const config = {
    dbUri : process.env.DB_URI,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
}

module.exports = config;
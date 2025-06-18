const errorHandler = (error, req, res, next) => {
    console.log("Error Name: ", error.name);
    console.log("Error Message: ", error.message);
    if (error.name === "CastError") {
        return res.status(400).json({error: "invalid id"})
    }
    else if(error.name === "ValidationError") {
        return res.status(400).json({error: error.message})
    }
    else if (error.name === "MongoServerError") {
        return res.status(400).json({error: error.message});
    }
    else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({error: error.message});
    }
    next(error);
}

module.exports = errorHandler;
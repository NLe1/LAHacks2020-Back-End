module.exports = function (req, res, next) {
    var token = req.header("Authorization");

    //Check for token
    if (!token) {
        return res.status(401).json({
            msg: "No token authorization provided"
        });
    } else {
        next()
    }
}
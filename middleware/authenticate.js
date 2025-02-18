const isAuthenticated = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "You do not have access." });
        }
        next(); // Call next() only if the user is authenticated
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = isAuthenticated;



//const isAuthenticated = (req, res, next) => {
    //if (req.session.user === undefined) {
        //return res.status(401).json("You do not have access.");
    //}
    //next();
//};


module.exports = { isAuthenticated };

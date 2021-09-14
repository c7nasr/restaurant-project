const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function(err, user) {
        if (err) return next(err);

        if (!user) return res.sendStatus(401)

        req.user = user;

        next();

    })(req, res, next);
};

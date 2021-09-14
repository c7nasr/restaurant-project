var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    
const User = require('../models/user.model');

const options={};
options.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey=process.env.JWT_SECRET;


module.exports = passport => {
    passport.use(
        new JwtStrategy(options, ({id}, done) => {
            User.findById(id)
                .then(user => {
                    if (user) return done(null, user);
                    return done(null, false);
                })
                .catch(err => {
                    return done(err, false, {message: 'Server Error'});
                });
        })
    );
};
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/userModel");
const { verifyPassword } = require("../util/passwordUtil");

const passportCB = (username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid = verifyPassword(password, user.hash, user.salt);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(passportCB);
passport.use(strategy);

// 1..
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findOne({ _id: userId })
    .then((user) => done(null, user.username))
    .catch((err) => done(err));
});

const router = require("express").Router();
const { register, login } = require("../control/userControl");
const passport = require("passport");
const auth = require("../middleware/auth");

router.route("/login").post(
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "failure",
  })
);
router.route("/register").post(register);

router.route("/failure").get((req, res) => res.send("failure"));
router.route("/protect").get(auth, (req, res) => res.send("proctect"));
router.route("/logout").get((req, res) => {
  req.logOut();
  res.send("log out");
});

module.exports = router;

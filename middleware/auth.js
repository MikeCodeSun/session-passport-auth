const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.status(401).json({ msg: "not authenticate" });
};

module.exports = auth;

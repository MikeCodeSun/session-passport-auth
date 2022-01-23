const User = require("../models/userModel");
const { genPassword, verifyPassword } = require("../util/passwordUtil");

// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     res.status(200).json({ msg: "login" });
//   } catch (error) {
//     console.log(error);
//   }
// };

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { salt, hash } = genPassword(password);
    const user = await User.create({ username, salt, hash });
    res.status(200).json({ msg: "register ok", user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register };

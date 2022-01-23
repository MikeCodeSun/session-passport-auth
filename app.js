const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connectDB");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const userRouter = require("./routes/userRoute");
const passport = require("passport");

const port = process.env.PORT;
const uri = process.env.URI;
const secret = process.env.SECRET;

app.use(express.json());

const sessionStore = new MongoStore({ mongoUrl: uri });
app.use(
  session({
    secret: secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

require("./util/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // console.log(req.user);
  // console.log(req.session);
  // console.log(req);
  next();
});

app.get("/", (req, res) => res.send("home page"));
app.use("/user", userRouter);

const start = async () => {
  try {
    await connectDB(uri);
    app.listen(port, console.log(`server is runing on port : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

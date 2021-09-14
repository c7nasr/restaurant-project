const express = require("express");
const passport = require("passport");

const app = express();
const helmet = require("helmet");
const Auth = require("./routes/auth.routes")
const Restaurant = require("./routes/restaurant.routes")

// Some middlewares
app.use(express.json());
app.use(passport.initialize());
require("./middlewares/passport")(passport);
app.use(helmet());

// 3) ROUTES
app.use("/auth", Auth);
app.use("/restaurant", Restaurant);

app.all("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = app;

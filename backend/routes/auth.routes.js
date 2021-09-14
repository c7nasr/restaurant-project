const express = require("express");
const { user_login ,user_signup} = require("../controllers/authentication");


const router = express.Router();

// POST route for user login
router
  .route("/login")
  .post(user_login);


// POST route for user register
router
.route("/register")
.post(user_signup);


module.exports = router;

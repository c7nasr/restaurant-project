const mongoose = require("mongoose");

const config_file = require("dotenv");
config_file.config({ path: "./config.env" });
const app = require("./app");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((e) => console.log("Something Went Error when trying reach DB: " + e))
 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App running on port " + port + "...");
});

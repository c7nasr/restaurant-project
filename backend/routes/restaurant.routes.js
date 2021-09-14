const express = require("express");
const {
  list_restaurants,
  add_restaurant,
  update_restaurant,
  delete_restaurant,
  search,
} = require("../controllers/restaurants");
const isAuth = require("../middlewares/authentcation");
const router = express.Router();

router.route("/").get(list_restaurants).post(isAuth, add_restaurant);

router.route("/search").post(search);

router
  .route("/:id")
  .patch(isAuth, update_restaurant)
  .delete(isAuth, delete_restaurant);

module.exports = router;

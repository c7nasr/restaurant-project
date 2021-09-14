const Restaurant = require("../models/restaurant.model");
exports.list_restaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    // Filters to be accessed from FrontEnd (Drop down menu, etc)

    const filters = await Restaurant.aggregate([
      {
        // Prepare Caseins array.
        $unwind: "$caseins",
      },
      {
        $group: {
          _id: null,
          caseins: {
            // Create New Array of all caseins in our docs.
            $addToSet: "$caseins",
          },
          locations: {
            // Create New Array of all locations in our docs.

            $addToSet: "$location",
          },
        },
      },
    ]);

    return res.json({ restaurants, filters });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.add_restaurant = async (req, res) => {
  try {
    const { name, location, caseins } = req.body;

    // We need no duplicates Restaurants names
    const is_existed = await Restaurant.findOne({ name });

    if (is_existed)
      return res
        .status(400)
        .json({ success: false, error: "Restaurant name is Already Existed" });

    await Restaurant.create({
      name,
      owner: req.user._id,
      caseins,
      location,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.update_restaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, location, caseins } = req.body;

    const is_existed = await Restaurant.findOne({ name });

    if (is_existed)
      return res
        .status(400)
        .json({ success: false, error: "Restaurant name is Already Existed" });

    await Restaurant.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { name, location, caseins }
    );

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.delete_restaurant = async (req, res) => {
  try {
    const { id } = req.params;

    await Restaurant.findByIdAndRemove(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.search = async (req, res) => {
  try {
    const { name, caseins, location } = req.body;

    queryCond = {
      ...(name && { name }),
      ...(caseins && { caseins }),
      ...(location && { location }),
    };
    const restaurants = await Restaurant.find(queryCond);

    return res.json({ restaurants });
  } catch (error) {
    return res.sendStatus(500);
  }
};

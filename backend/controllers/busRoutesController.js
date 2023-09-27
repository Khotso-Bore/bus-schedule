const BusRoute = require("../models/BusRoute");

const getRoute = async (req, res) => {
  try {
    const response = await BusRoute.findOne();

    //console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRoute,
};

const BusRoute = require("../models/BusRoute");

const getRoute = async (req, res) => {
  try {
    const city = req.query.city;
    const area = req.query.area;
    const response = await BusRoute.findOne({ city, area });

    //console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRoutes = async (req, res) => {
  try {
    const response = await BusRoute.find({});

    //console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRoute,
  getRoutes,
};

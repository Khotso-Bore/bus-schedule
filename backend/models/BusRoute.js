const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const busRouteSchema = new Schema({
  route: {
    type: "String",
  },
  routeName: {
    type: "String",
  },
  mainDepartPoint: {
    name: {
      type: "String",
    },
    departTimes: {
      type: ["String"],
    },
  },
  secondaryDepartPoint: {
    name: {
      type: "String",
    },
    departTimes: {
      type: ["String"],
    },
  },
  stops: {
    type: ["Mixed"],
  },
  bounds: {
    type: ["Mixed"],
  },
  path: {
    type: ["Mixed"],
  },
});

module.exports = mongoose.model("BusRoutes", busRouteSchema, "Routes");

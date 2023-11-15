const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const busRouteSchema = new Schema({
  _id: {
    type: "ObjectId",
  },
  route: {
    type: "String",
  },
  area: {
    type: "String",
  },
  city: {
    type: "String",
  },
  mainDeparturePoint: {
    name: {
      type: "String",
    },
    departureTimes: {
      type: ["String"],
    },
  },
  secondaryDeparturePoint: {
    name: {
      type: "String",
    },
    departureTimes: {
      type: ["String"],
    },
  },
  stops: {
    type: ["Mixed"],
  },
  path: {
    type: ["Array"],
  },
});

module.exports = mongoose.model("BusRoutes", busRouteSchema, "Routes");

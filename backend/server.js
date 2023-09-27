require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const busRoutes = require("./routes/busRoutes");
const { error } = require("console");
const cors = require("cors");

const app = express();

app.use(cors());
app.use("/api/busroutes/", busRoutes);

mongoose
  .connect(process.env.MONGO_URI, { dbName: "BusRoutes" })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connecteed to db and Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

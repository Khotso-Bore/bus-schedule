const express = require("express");

const { getRoute, getRoutes } = require("../controllers/busRoutesController");

const router = express.Router();

router.get("/", getRoutes);

router.get("/route", getRoute);

module.exports = router;

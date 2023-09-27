const express = require("express");

const { getRoute } = require("../controllers/busRoutesController");

const router = express.Router();

router.get("/", getRoute);

module.exports = router;

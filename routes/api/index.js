const router = require("express").Router();
const nationalRoutes = require("./national");

// Book routes
router.use("/national", nationalRoutes);

module.exports = router;
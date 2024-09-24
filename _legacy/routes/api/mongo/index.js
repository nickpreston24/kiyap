const router = require("express").Router();

// Mongo
const professionalRoutes = require("./professionals");
// const studentRoutes = require("./students");
const schoolRoutes = require("./schools");

// MongoDB routes
router.use("/pros", professionalRoutes);
// router.use("/students", studentRoutes);
router.use("/schools", schoolRoutes);

module.exports = router;

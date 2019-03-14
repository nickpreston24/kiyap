const router = require("express").Router();

const professionalRoutes = require("./professionals");
const studentRoutes = require("./students");
const schoolRoutes = require("./schools");

router.use("/pros", professionalRoutes);
router.use("/students", studentRoutes);
router.use("/schools", schoolRoutes);

module.exports = router;

const router = require("express").Router();
const professionalRoutes = require("./professionals");
const studentRoutes = require("./students");

router.use("/pros", professionalRoutes);
router.use("/students", studentRoutes);

module.exports = router;

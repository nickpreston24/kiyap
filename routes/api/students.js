const router = require("express").Router();
const students = require("../../controllers/students");

// Matches with "/api/students"
router.route("/")
  .get(students.findAll)
  .post(students.create);

// Matches with "/api/students/:id"
router
  .route("/:id")
  .get(students.findById)
  .put(students.update)
  .delete(students.remove);

module.exports = router;

const router = require("express").Router();
const schools = require("../../controllers/schools");

// Matches with "/api/schools"
router.route("/")
  .get(schools.findAll)
  .post(schools.create);

// Matches with "/api/schools/:id"
router
  .route("/:id")
  .get(schools.findById)
  .put(schools.update)
  .delete(schools.remove);

module.exports = router;

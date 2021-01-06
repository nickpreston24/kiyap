const router = require("express").Router();
const schools = require("../../../db/controllers/schools");

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

// Matches "/api/schools/student/:id"
router
    .route("/student/:id")
    .get(schools.findByStudent);

module.exports = router;
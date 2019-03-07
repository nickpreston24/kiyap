const router = require("express").Router();
const professionals = require("../../controllers/professionals");

// Matches with "/api/professionals"
router.route("/")
  .get(professionals.findAll)
  .post(professionals.create);

// Matches with "/api/professionals/:id"
router
  .route("/:id")
  .get(professionals.findById)
  .put(professionals.update)
  .delete(professionals.remove);

module.exports = router;

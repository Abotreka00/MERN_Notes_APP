const express = require("express");
const {
  CreateNotes,
  DeleteNotes,
  GetAllNotes,
  SingleNotes,
  UpdateNotes,
} = require("../controllers/notesController.js");
const requireAuth = require("../middlewares/requirdeAuth.js");

const router = express.Router();

router.use(requireAuth);

router.route("/").get(GetAllNotes).post(CreateNotes);

router.route("/:id").get(SingleNotes).patch(UpdateNotes).delete(DeleteNotes);

module.exports = router;

const express = require("express");
const {
  CreateNotes,
  DeleteNotes,
  GetAllNotes,
  SingleNotes,
  UpdateNotes,
} = require("../controllers/notesController.js");

const router = express.Router();

router.route("/").get(GetAllNotes).post(CreateNotes);

router.route("/:id").get(SingleNotes).patch(UpdateNotes).delete(DeleteNotes);

module.exports = router;

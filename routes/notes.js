const express = require("express");
const notesController = require("../controllers/notesController.js");

const router = express.Router();

router.route("/").get(notesController.GetAllNotes);

router.route("/:id").get(notesController.SingleNotes);

router.route("/").post(notesController.CreateNotes);

router.route("/:id").patch(notesController.UpdateNotes);

router.route("/:id").delete(notesController.DeleteNotes);

module.exports = router;

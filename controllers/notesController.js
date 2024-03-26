const asyncHandler = require("express-async-handler");
const jsend = require("jsend");
const Notes = require("../model/Note");
const Joi = require("joi");
const mongoose = require("mongoose");

const isValidMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const GetAllNotes = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const result = await Notes.find({ userId }, { __v: false });
  res.status(200).json(jsend.success(result));
});

const SingleNotes = asyncHandler(async (req, res) => {
  const ID = req.params.id;
  if (!isValidMongoId(ID)) {
    return res.status(400).json(jsend.error("This ID Not Valid To Notes"));
  }
  const singleNotes = await Notes.findById(ID);
  if (!singleNotes) {
    return res.status(404).json(jsend.error("notes not exists"));
  }
  res.status(200).json(jsend.success(singleNotes));
});

const CreateNotes = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { title, description, color, createdAt } = req.body;

  const schema = Joi.object({
    title: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(5).max(200).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(jsend.error(error.details[0].message)); // Return after sending validation error response
  }

  try {
    // Create a new note using the Notes model's create() method
    await Notes.create({
      userId,
      title,
      description,
      color,
      createdAt,
    });

    return res
      .status(200)
      .json(jsend.success("Notes has been added successfully"));
  } catch (err) {
    console.error("Error creating note:", err);
    return res.status(500).json(jsend.error("Internal Server Error"));
  }
});

const UpdateNotes = asyncHandler(async (req, res) => {
  const ID = req.params.id;
  if (!isValidMongoId(ID)) {
    return res.status(400).json(jsend.error("This ID Not Valid To Notes"));
  }
  const singleNotes = await Notes.findByIdAndUpdate(ID, { ...req.body });
  if (!singleNotes) {
    return res.status(404).json(jsend.error("notes not exists"));
  }
  res.status(200).json(jsend.success("Your Notes has been Updated"));
});

const DeleteNotes = asyncHandler(async (req, res) => {
  const ID = req.params.id;
  if (!isValidMongoId(ID)) {
    return res.status(400).json(jsend.error("This ID Not Valid To Notes"));
  }
  const singleNotes = await Notes.findByIdAndDelete(ID);
  if (!singleNotes) {
    return res.status(404).json(jsend.error("notes not exists"));
  }
  res.status(200).json(jsend.success("Your Notes has been Deleted"));
});

module.exports = {
  GetAllNotes,
  SingleNotes,
  CreateNotes,
  UpdateNotes,
  DeleteNotes,
};

const asyncHandler = require("express-async-handler");
const jsend = require("jsend");

const GetAllNotes = asyncHandler((req, res) => {
  res.status(200).json(jsend.success("AllNotes"));
});

const SingleNotes = asyncHandler((req, res) => {
  res.status(200).json(jsend.success("SingleNotes"));
});
const CreateNotes = asyncHandler((req, res) => {
  res.status(200).json(jsend.success("CreateNotes"));
});
const UpdateNotes = asyncHandler((req, res) => {
  res.status(200).json(jsend.success("UpdateNotes"));
});
const DeleteNotes = asyncHandler((req, res) => {
  res.status(200).json(jsend.success("DeleteNotes"));
});

module.exports = {
  GetAllNotes,
  SingleNotes,
  CreateNotes,
  UpdateNotes,
  DeleteNotes,
};

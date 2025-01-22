// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  load,
  create,
  edit,
  remove,
} = require("../controller/todoController");
router
  .route("/todo/:id")
  .get(load)
  .put(create)
  .post(edit)
  .delete(remove);

module.exports = router;

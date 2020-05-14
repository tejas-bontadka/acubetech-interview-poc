const express = require("express");
const router = express.Router();

const taskModel = require("../model/TaskModel");
const httpUtil = require("../../utils/HttpUtils");
const schema = require("../../utils/Validator");

const logger = require("../../utils/Logger");

router.get("/", async (req, res, next) => {
  try {
    const result = await taskModel.getAllTasks();
    res.status(200).json(httpUtil.getSuccessResponse(result));
  } catch (err) {
    logger.log("error", err);
    res.status(500).json(httpUtil.getException(err));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (!error) {
      const result = await taskModel.saveTask(req.body);
      res.status(201).json(httpUtil.getCreationResponse(result));
    }else{
      res.status(500).json(httpUtil.getException(error));
    }
  } catch (err) {
    logger.log("error", err);
    res.status(500).json(httpUtil.getException(err));
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json(httpUtil.getBadRequest("bad request"));
    }
    const { error } = schema.validate(req.body);
    if (!error) {
    const result = await taskModel.updateTaskById(req.body);
    res.status(200).json(httpUtil.getSuccessResponse(result));
    }else{
      res.status(500).json(httpUtil.getException(error));
    }
  } catch (err) {
    logger.log("error", err);
    res.status(500).json(httpUtil.getException(err));
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json(httpUtil.getBadRequest("bad request"));
    }
    const result = await taskModel.deleteTaskById(id);
    res.status(200).json(httpUtil.getSuccessResponse(result));
  } catch (err) {
    logger.log("error", err);
    res.status(500).json(httpUtil.getException(err));
  }
});

module.exports = router;

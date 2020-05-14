const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  taskId: String,
  description: String,
  status: String,
});

const Tasks = mongoose.model("Tasks", taskSchema);

exports.saveTask = async (request) => {
  try {
    const mongooseRequest = new Tasks({
      _id: new mongoose.Types.ObjectId(),
      taskId: request.taskId,
      description: request.description,
      status: request.status,
    });
    const res = await mongooseRequest.save();
    return res;
  } catch (err) {
    throw err;
  }
};

exports.getAllTasks = async () => {
  try {
    const data = await Tasks.find();
    return data;
  } catch (err) {
    throw err;
  }
};

exports.updateTaskById = async (request) => {
  try {
    const result = await Tasks.updateOne(
      { _id: request._id },
      { $set: { description: request.description, status: request.status } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTaskById = async (id) => {
  try {
    const result = await Tasks.remove({ _id: id });
    return result;
  } catch (err) {
    throw err;
  }
};

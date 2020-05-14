import React, { useState } from "react";
import {
  createTask,
  updateTask
} from "../TaskList/TaskListServices";

const EditCreatePopUp = (props) => {
  const [description, setDescription] = useState(
    (props.task && props.task.description) || ""
  );

  const [error, setError] = useState({});

  const handleDescription = (value) => {
    setError({});
    if (!value) {
      setError({ description: "Please fill the description" });
    }
    setDescription(value);
  };

  const createTaskItem = async () => {
    const { getAllTasks, closePopUp } = props;
    const requestObj = {
      taskId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      description,
      status: "Todo",
    };
    const res = await createTask(requestObj);
    if (res && res.status === 201) {
      closePopUp();
      getAllTasks();
    } else {
      alert("Creation failed");
    }
  };

  const updateTaskItem = async (doneStatus) => {
    const { getAllTasks, closePopUp, task } = props;
    let requestObj = {};
    if (!doneStatus) {
      requestObj = { ...task, description };
    } else {
      requestObj = { ...task, description, status: "Done" };
    }
    const res = await updateTask(requestObj);
    if (res && res.status === 200) {
      closePopUp();
      getAllTasks();
    } else {
      alert("Updation failed");
    }
  };

  return (
    <div className="popupoverlay">
      <div className="popUpContainer">
        <div className="popUpHeading">
          {props.action === "create"
            ? "Create Todo"
            : `Update Todo : ${props.task.taskId}`}
        </div>
        <div className="fieldLabel">Task Description *</div>
        <div className="fieldWrap">
          <input
            className="fieldStyle"
            type="text"
            value={description}
            onChange={(e) => handleDescription(e.target.value)}
          />
          {error.description && (
            <div className="errorMsg">{error.description}</div>
          )}
        </div>
        <div className="buttonGroups">
          {props.action === "create" && (
            <button
              className="buttonPrimary"
              onClick={() => createTaskItem()}
              disabled={!description || error.description}
            >
              Create
            </button>
          )}
          {props.action === "update" && (
            <span>
              <button
                className="buttonPrimary"
                onClick={() => updateTaskItem(false)}
                disabled={!description || error.description}
              >
                Update
              </button>
              <button
                className="buttonSuccess"
                onClick={() => updateTaskItem(true)}
              >
                Move to done
              </button>
            </span>
          )}
          <button className="buttonClose" onClick={() => props.closePopUp()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCreatePopUp;

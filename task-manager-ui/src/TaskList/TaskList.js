import React, { useState, useEffect } from "react";
import "../Common/Styles.css";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RiMenuAddLine } from "react-icons/ri";
import EditCreatePopUp from "../EditCreatePopUp";
import { getAllTasksFromApi, deleteTask } from "./TaskListServices";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [action, setAction] = useState("create");
  const [selectedTask, setSelectedTask] = useState({});
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const res = await getAllTasksFromApi();
    if (res && res.status === 200) {
      setTasks(res.data);
    } else {
      setTasks([]);
    }
  };

  const deleteItemTask = async (task) => {
    const res = await deleteTask(task._id);
    if (res && res.status === 200) {
      getAllTasks();
    }
  };

  const updateAction = (value, data) => {
    setAction(value);
    setSelectedTask(data);
    setOpenPopUp(true);
  };

  const closePopUp = () => {
    setOpenPopUp(false);
  };

  return (
    <div className="taskListWrapper">
      <div className="taskHeaderContent">
        <span>Tasks</span>
        <span
          className="iconWrapper iconSeperator"
          onClick={() => updateAction("create", {})}
        >
          <RiMenuAddLine />
        </span>
      </div>
      <div className="taskListContainer">
        {!tasks.length && <div> No Tasks </div>}
        {tasks.map((task, index) => (
          <div className="taskChunks" key={index}>
            <span
              className={task.status === "Todo" ? "taskTagTodo" : "taskTagDone"}
            >
              {task.status}
            </span>
            <span>
              {task.taskId}: {task.description}
            </span>
            <span className="iconWrapper">
              <span
                className="iconSeperator"
                onClick={() => updateAction("update", task)}
              >
                <MdEdit />
              </span>
              <span
                className="iconSeperator"
                onClick={() => deleteItemTask(task)}
              >
                <AiFillDelete />
              </span>
            </span>
          </div>
        ))}
      </div>
      {openPopUp && (
        <EditCreatePopUp
          task={selectedTask}
          action={action}
          closePopUp={closePopUp}
          getAllTasks={getAllTasks}
        />
      )}
    </div>
  );
};

export default TaskList;

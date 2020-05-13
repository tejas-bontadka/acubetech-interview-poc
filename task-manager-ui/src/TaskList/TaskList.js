import React, { useState } from "react";
import "../Common/Styles.css";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RiMenuAddLine } from "react-icons/ri";
import EditCreatePopUp from "../EditCreatePopUp";

const tasks = [
  { taskId: "123", description: "Task1rtyhui", assignee: "XYZ", status: "Todo" },
  { taskId: "456", description: "Task10oiuhg", assignee: "XYZ", status: "Todo" },
  { taskId: "789", description: "Taskaserthbn1", assignee: "XYZ", status: "Done" },
  { taskId: "852", description: "Tasrdcvhjk,mnk1", assignee: "XYZ", status: "Todo" },
];

const TaskList = () => {
  const [action, setAction] = useState("create");
  const [selectedTask, setSelectedTask] = useState({});
  const [openPopUp, setOpenPopUp] = useState(false);

  const updateAction = (value, data) => {
    setAction(value);
    setSelectedTask(data);
    setOpenPopUp(true);
  };

  const closePopUp = () => {
      setOpenPopUp(false);
  }

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
        {tasks.map((task) => (
          <div className="taskChunks">
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
              <span className="iconSeperator">
                <AiFillDelete />
              </span>
            </span>
          </div>
        ))}
      </div>
      {openPopUp && <EditCreatePopUp task={selectedTask} action={action} closePopUp={closePopUp}/>}
    </div>
  );
};

export default TaskList;

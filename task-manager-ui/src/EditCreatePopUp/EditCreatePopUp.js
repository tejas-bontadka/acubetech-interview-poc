import React, { useState } from "react";

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
  return (
    <div className="popupoverlay">
      <div className="popUpContainer">
        <div className="popUpHeading">
          {props.action === "create" ? "Create Todo" : `Update Todo : ${props.task.taskId}`}
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
              disabled={!description || error.description}
            >
              Create
            </button>
          )}
          {props.action === "update" && (
            <span>
              <button
                className="buttonPrimary"
                disabled={!description || error.description}
              >
                Update
              </button>
              <button className="buttonSuccess">Move to done</button>
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

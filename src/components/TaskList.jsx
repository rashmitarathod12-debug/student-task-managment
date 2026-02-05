import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <>
    <div className="task-grid">
      {tasks.map((task) => {
        <div className="task-card" key={task.id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>

          <div className="task-meta">
            <span>Date: {task.date}</span>
            <span className={`priority-badge priority-${task.priority}`}>
              {task.priority}
            </span>
          </div>

          <div className="task-actions">
            <button
              className="btn-icon"
              style={{ background: "#002cff" }}
              title="edit-task"
            >
              edit
            </button>

            <button
              className="btn-icon"
              style={{ background: "#ff2c2c" }}
              title="delete-task"
            >
              Delete
            </button>
          </div>
        </div>
      })}
    </div>
    </>
  );
};

export default TaskList;
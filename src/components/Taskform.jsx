import React, { useEffect, useState } from "react";

const TaskForm = ({addTask, updateTask, editingTask}) => {
  const [formData, setFormData] = useState({
    // title: "",
    // description: "",
    // dueDate: "",
    // priority: "Medium",
  });

  const [errors, setErrors] = useState({});

  useEffect(()=>{
    setFormData(editingTask)
  },[editingTask])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };
  const validate = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    } else if (formData.title.length > 6) {
      errors.title = "Maximum 6 characters allowed.";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    }

    if (!formData.dueDate) {
      errors.dueDate = "Date is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if(editingTask){
        updateTask(formData)
      }
      else{
        addTask(formData)
      }
      //   addTask(formData)
      // alert("Task Added Successfully ✅");

      // setFormData({
      //   title: "",
      //   description: "",
      //   dueDate: "",
      //   priority: "",
      // });
      // setErrors({});
    }
  };
  const resetForm = () => {
    setFormData({
        title: "",
        dueDate: "",
        priority: ""
    })
  }
  return (
    <div className="add-task-card">
      <h2 style={{ marginBottom: "15px" }}>Add New Task</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Task Title"
            name="title"
            value={formData?.title}
            onChange={handleInputChange}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={formData?.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <span className="error-msg">{errors.description}</span>
          )}
        </div>

        {/* Date & Priority */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <input
              type="date"
              name="dueDate"
              value={formData?.dueDate}
              onChange={handleInputChange}
            />
            {errors.dueDate && <span className="error-msg">{errors.dueDate}</span>}
          </div>

          <div style={{ flex: 1 }}>
            <select
              name="priority"
              value={formData?.priority}
              onChange={handleInputChange}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            {errors.priority && (
              <span className="error-msg">{errors.priority}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div
          className="form-actions"
          style={{ display: "flex", gap: "10px", marginTop: "10px" }}
        >
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>
            {editingTask ? 'Update' : 'Add'} Task
          </button>
          <button
            type="reset"
            className="btn-secondary"
            style={{ flex: 1 }}
            onClick={() =>
              setFormData({
                title: "",
                description: "",
                dueDate: "",
                priority: "",
              })
            }
          >
            Clean
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
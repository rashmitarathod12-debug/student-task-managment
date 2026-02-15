import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("authData");
    navigate("/login");
  };

  const handleAddTask = async (newTask) => {
    const taskToAdd = { ...newTask, completed: false };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToAdd),
      });

      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      setTasks(
        tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      setEditTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  const editingTask = (task) => {
    setEditTask(task);
  };

  return (
    <div>
      <Navbar title="Task Management" onLogout={handleLogout} />
      <TaskForm
        addTask={handleAddTask}
        updateTask={handleUpdateTask}
        editingTask={editTask}
      />
      <h1>MY TASKS</h1>
      <TaskList
        tasks={tasks}
        editingTask={editingTask}
        deletingTask={handleDeleteTask}
      />
    </div>
  );
};

export default Dashboard;

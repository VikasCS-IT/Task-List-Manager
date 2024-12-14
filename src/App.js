import React, { useEffect, useState } from "react";
import EditableTable from "./components/EditableTable";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import { fetchTasks } from "./services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch initial tasks from API
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    getTasks();
  }, []);

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    const updatedTasks = [
      ...tasks,
      { ...newTask, id: tasks.length + 1 },
    ];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    toast.success("🎉 Task added successfully!");
  };

  const handleTaskUpdate = (updatedTask, updatedField) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);

    // Show different toast messages based on the updated field
    if (updatedField === "title") {
      toast.info("✏️ Title updated successfully!");
    } else if (updatedField === "description") {
      toast.info("📝 Description updated successfully!");
    } else if (updatedField === "status") {
      toast.info("✔️ Status updated successfully!");
    }
  };

  // Handle task deletion
  const handleTaskDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    toast.error("❌ Task deleted successfully!");
  };

  // Handle filtering tasks
  const handleFilter = (status) => {
    if (status === "") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task List Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4 mt-4">
          <FilterBar onFilter={handleFilter} />
          <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded">
            Total: {filteredTasks.length}
          </span>
          <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded">
            To Do: {tasks.filter((task) => task.status === "To Do").length}
          </span>
          <span className="bg-yellow-200 text-yellow-800 py-1 px-2 rounded">
            In Progress: {tasks.filter((task) => task.status === "In Progress").length}
          </span>
          <span className="bg-green-200 text-green-800 py-1 px-2 rounded">
            Done: {tasks.filter((task) => task.status === "Done").length}
          </span>
          <input className="border px-2 p-0 rounded"
            type="text" id="search"
            placeholder="Search by Title or Description"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <EditableTable
        data={filteredTasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default App;

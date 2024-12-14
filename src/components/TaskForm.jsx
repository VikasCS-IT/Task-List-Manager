import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
    const [task, setTask] = useState({ title: "", description: "", status: "To Do" });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(task);
        setTask({ title: "", description: "", status: "To Do" });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={handleChange}
                className="border p-2"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={handleChange}
                className="border p-2"
            />
            <select name="status" value={task.status} onChange={handleChange} className="border p-2">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add Task</button>
        </form>
    );
};

export default TaskForm;

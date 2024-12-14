import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = async () => {
    const { data } = await axios.get(API_URL);
    return data.slice(0, 20).map((task) => ({
        id: task.id,
        title: task.title,
        description: "Sample Description",
        status: task.completed ? "Done" : "To Do",
    }));
};

import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import "./TaskList.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await API.get("/");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const deleteTask = async (id) => {
    await API.delete(`/${id}`);
    loadTasks();
  };

  return (
    <div className="taskList">

      {/* 🔥 Add button at very TOP always visible */}
      <div className="topBar">
        <Link className="addButton" to="/add">+ Add Task</Link>
      </div>

      <h2 className="taskListTitle">All Tasks</h2>

      {tasks.length === 0 ? (
        <p className="noTasks">No tasks assigned</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="taskCard">
            <h3 className="taskTitle">{task.title}</h3>
            <p className="taskDescription">{task.description}</p>
            <p className="taskStatus">Status: {task.status}</p>

            <div className="taskActions">
              <Link className="editButton" to={`/edit/${task._id}`}>Edit</Link>
              <button
                className="deleteButton"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

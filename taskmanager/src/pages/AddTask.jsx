import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

export default function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/", task);
    navigate("/");
  };

  return (
    <form onSubmit={submit} className="formContainer">
      <h2 className="formTitle">Add Task</h2>

      <input
        className="formInput"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <textarea
        className="formTextarea"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <button className="formButton">Add</button>
    </form>
  );
}

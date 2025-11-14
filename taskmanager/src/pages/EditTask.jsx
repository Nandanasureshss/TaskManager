import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css";
export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  useEffect(() => {
    API.get(`/${id}`).then((res) => setTask(res.data));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await API.put(`/${id}`, task);
    navigate("/");
  };

  return (
    <form onSubmit={submit} className="formContainer">
      <h2 className="formTitle">Edit Task</h2>

      <input
        className="formInput"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <textarea
        className="formTextarea"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <select
        className="formSelect"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button className="formButton">Update</button>
    </form>
  );
}

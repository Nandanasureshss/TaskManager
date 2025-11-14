import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());  
connectDB();

app.use("/api/tasks", taskRoutes);

app.listen(5001, () => console.log("Server running on port 5001"));

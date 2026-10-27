import express from "express";
import cors from "cors";
import chatRoute from './routes/chatRoute.js'
const app = express()
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json())
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/", chatRoute)

export default app;
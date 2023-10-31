import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./Src/Routes/authRoutes";
import bookRoutes from "./Src/Routes/bookRoutes";
import "./Src/Database";
import { APP_PORT } from "./Config";
const app = express();
const port = APP_PORT || 5000;
import "./Src/Database";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

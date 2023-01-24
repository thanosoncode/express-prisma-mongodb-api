import express, { Express } from "express";
import dotenv from "dotenv";
import { router } from "./routes/workoutRoutes";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/workouts", router);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

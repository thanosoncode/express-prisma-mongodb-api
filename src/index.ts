import express, { Express } from "express";
import dotenv from "dotenv";
import { router } from "./routes/workoutRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/workouts", router);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

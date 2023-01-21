import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { prisma } from "../prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/api/workouts", async (req, res) => {
  const workouts = await prisma.workout.findMany();
  if (!workouts) {
    return res.status(400).json({ message: "no workouts" });
  }
  return res.status(200).json(workouts);
});

app.post("/api/create-workout", async (req: Request, res: Response) => {
  const label = req.body.label;

  if (!label) {
    return res.status(400).json({ message: "label is required" });
  }
  const workout = await prisma.workout.create({
    data: {
      label,
    },
  });

  res.status(201).json(workout);
});

app.get("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({ message: "invalid id" });
  }

  const workout = await prisma.workout.findFirst({
    where: {
      id,
    },
  });

  if (!workout) {
    return res.status(400).json({ message: "cant find workout with that id" });
  }
  return res.json(workout);
});

app.put("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;

  if (id.length !== 24) {
    return res.status(400).json({ message: "invalid id" });
  }

  if (!label) {
    return res.status(400).json({ message: "label is required" });
  }

  const workout = await prisma.workout.findFirst({
    where: {
      id,
    },
  });

  if (!workout) {
    return res
      .status(400)
      .json({ message: "could not find workout with that id" });
  }

  const updatedWorkout = await prisma.workout.update({
    where: {
      id,
    },
    data: {
      label,
    },
  });
  return res.status(200).json(updatedWorkout);
});

app.delete("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({ message: "invalid id" });
  }

  const workout = await prisma.workout.findFirst({
    where: {
      id,
    },
  });

  if (!workout) {
    return res
      .status(400)
      .json({ message: "could not find workout with that id" });
  }

  await prisma.workout.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(workout);
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";

const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await prisma.workout.findMany();
  if (!workouts) {
    return res.status(400).json({ message: "no workouts" });
  }
  return res.status(200).json(workouts);
};

const createWorkout = async (req: Request, res: Response) => {
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
};

const getSingleWorkout = async (req: Request, res: Response) => {
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
};

const updateWorkout = async (req: Request, res: Response) => {
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
};

const deleteWorkout = async (req: Request, res: Response) => {
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
};

export {
  getWorkouts,
  createWorkout,
  getSingleWorkout,
  updateWorkout,
  deleteWorkout,
};

import axios from "./axios";
import { Workout } from "../utils/models";

export const getWorkouts = async (): Promise<Workout[] | undefined> => {
  const response = await axios.get("/workouts");
  const data = await response.data;
  return data;
};

export const postWorkout = async (workout: Workout) => {
  const response = await axios.post("/workouts", workout);
  const data = await response.data;
  return data;
};

export const deleteWorkout = async (id: string) => {
  const response = await axios.delete(`/workouts/${id}`);
  const data = await response.data;
  return data;
};

export const getSingleWorkout = async (id: string): Promise<Workout | null> => {
  if (id) {
    const response = await axios.get(`/workouts/${id}`);
    const data = await response.data;
    return data;
  }
  return null;
};

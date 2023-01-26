import axios from "./axios";
import { Workout } from "../utils/models";

export const getWorkouts = async (): Promise<Workout[] | undefined> => {
  const response = await axios.get("/workouts");
  const data = await response.data;
  return data;
};

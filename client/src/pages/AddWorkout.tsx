import { useState } from "react";
import AddExercise from "../components/AddExercise";
import PageTitle from "../components/PageTitle";
import { Exercise, Workout } from "../utils/models";

const AddWorkout = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  console.log(exercises);
  return (
    <>
      <PageTitle title="add workout" />
      {exercises
        ? exercises.map((ex, index) => (
            <div key={index}>
              <span>name: {ex.name}</span>
              <span>sets: {ex.sets}</span>
              <span>reps: {ex.reps}</span>
              <span>weight: {ex.weight}</span>
            </div>
          ))
        : null}
      <AddExercise exercises={exercises} setExercises={setExercises} />
    </>
  );
};
export default AddWorkout;

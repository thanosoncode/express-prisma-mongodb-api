import { Button } from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postWorkout } from "../api/workouts";
import AddExercise from "../components/AddExercise";
import AddLabel from "../components/AddLabel";
import PageTitle from "../components/PageTitle";
import { Exercise } from "../utils/models";

const AddWorkout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [doneWithExercises, setDoneWithExercises] = useState(false);
  const [label, setLabel] = useState("");
  const [labelAdded, setLabelAdded] = useState(false);
  const workoutIsReady = labelAdded && exercises.length > 0;

  const showExercises = exercises
    ? exercises.map((ex, index) => (
        <div key={index}>
          <span>name: {ex.name}</span>
          <span>sets: {ex.sets}</span>
          <span>reps: {ex.reps}</span>
          <span>weight: {ex.weight}</span>
        </div>
      ))
    : null;

  const handleLabelAdded = () => setLabelAdded(true);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLabel(event.target.value);
  };

  const { mutate, isLoading } = useMutation(
    ["post-workout"],
    () => postWorkout({ label, exercises }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["workouts"] });
        navigate("/workouts");
      },
    }
  );

  const handleGoBack = () => setDoneWithExercises(false);

  return (
    <>
      <PageTitle title="add workout" />
      {showExercises}
      {doneWithExercises ? (
        <AddLabel
          label={label}
          onChange={handleChange}
          onAdd={handleLabelAdded}
          onGoBack={handleGoBack}
        />
      ) : null}
      {doneWithExercises ? null : (
        <>
          <AddExercise exercises={exercises} setExercises={setExercises} />
          <Button
            variant="contained"
            disabled={exercises.length === 0}
            onClick={() => setDoneWithExercises(true)}
          >
            done with exercises
          </Button>
        </>
      )}
      {workoutIsReady ? (
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={() => mutate()}
        >
          save workout
        </Button>
      ) : null}
    </>
  );
};
export default AddWorkout;

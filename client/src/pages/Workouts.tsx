import DeleteForever from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteWorkout, getWorkouts } from "../api/workouts";
import { LONG_CACHE } from "../utils/constants";
import { Workout } from "../utils/models";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";

const Workouts = () => {
  const queryClient = useQueryClient();

  const { data: workouts, isLoading } = useQuery(["workouts"], getWorkouts, {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE,
  });

  const { mutate, isLoading: isDeleting } = useMutation(
    ["delete-workout"],
    deleteWorkout,
    {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["workouts"] }),
    }
  );

  return (
    <div>
      <h4>MyWorkouts</h4>
      {isLoading ? <CircularProgress /> : null}
      {workouts
        ? workouts.map((workout: Workout) => {
            const {
              id,
              label,
              exercises: [{ name, sets, reps, weight }],
            } = workout;
            return (
              <div key={id}>
                <h5>{label}</h5>
                <div>
                  <span>name: {name}</span>
                  <span>sets: {sets}</span>
                  <span>reps: {reps}</span>
                  <span>weight: {weight}</span>
                </div>
                <IconButton onClick={() => (id ? mutate(id) : null)}>
                  <DeleteForever />
                </IconButton>
              </div>
            );
          })
        : null}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isDeleting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default Workouts;

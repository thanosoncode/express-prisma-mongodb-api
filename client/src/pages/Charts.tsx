import { Box, SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { getWorkouts } from "../api/workouts";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import SelectByExercise from "../components/SelectByExercise";
import { LONG_CACHE } from "../utils/constants";
import { Exercise } from "../utils/models";

const Charts = () => {
  const [selectedExercise, setSelectedExercise] = useState(
    "bulgarian split squats"
  );

  const handleSelectChange = (event: SelectChangeEvent) =>
    setSelectedExercise(event.target.value);

  const { data: workouts } = useQuery(["workouts"], getWorkouts, {
    staleTime: LONG_CACHE,
    refetchOnWindowFocus: false,
  });

  const getRecordsPerExercise = (name: string) => {
    return workouts
      ? workouts
          ?.map((w) => ({
            ...w,
            exercises: w.exercises.map((ex) => ({
              ...ex,
              createdAt: w.createdAt,
            })),
          }))
          .flatMap((w) => w.exercises)
          .filter((ex) => ex.name === name)
      : [];
  };

  const allRecordsPerExercise = getRecordsPerExercise(selectedExercise);
  const calculateVolume = (exercise: Exercise) =>
    Number(exercise.sets) * Number(exercise.reps) * Number(exercise.weight);

  const volumePerExercise = allRecordsPerExercise.map((ex) => {
    return {
      name: ex.name,
      volume: calculateVolume(ex),
      sets: ex.sets,
      reps: ex.reps,
      weight: ex.weight,
      createdAt: ex.createdAt
        ? format(new Date(ex.createdAt).getTime(), "dd/MM")
        : "",
    };
  });

  const topWeigtPerExercise = allRecordsPerExercise.map((ex) => ({
    name: ex.name,
    topWeight: ex.weight,
    createdAt: ex.createdAt
      ? format(new Date(ex.createdAt).getTime(), "dd/MM")
      : "",
  }));

  const options = Array.from(
    new Set(
      (workouts ? workouts.flatMap((w) => w.exercises) : []).map(
        (ex) => ex.name
      )
    )
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
        Check out how a specific exercise has progressed.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
          Select exercise
        </Typography>
        <SelectByExercise
          value={selectedExercise}
          onChange={handleSelectChange}
          options={options}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Volume per exercise
          </Typography>
          <BarChart data={volumePerExercise} />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Top weight
          </Typography>
          <LineChart data={topWeigtPerExercise} />
        </Box>
      </Box>
    </Box>
  );
};
export default Charts;

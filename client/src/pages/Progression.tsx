import { Box, SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { getWorkouts } from "../api/workouts";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import SelectByExercise from "../components/SelectByExercise";
import theme from "../theme";
import { LONG_CACHE } from "../utils/constants";
import { Exercise } from "../utils/models";

const Progression = () => {
  const { classes } = useStyles();
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
      <Typography variant="h6" className={classes.title}>
        Check out how a specific exercise has progressed.
      </Typography>

      <Box className={classes.subtitleContainer}>
        <Typography variant="subtitle2" className={classes.subtitle}>
          Select exercise
        </Typography>
        <SelectByExercise
          value={selectedExercise}
          onChange={handleSelectChange}
          options={options}
          showExercisesCount={true}
        />
      </Box>
      <Box className={classes.graphsContainer}>
        <Box>
          <Typography variant="subtitle1" className={classes.graphTitle}>
            Volume per exercise
          </Typography>
          <BarChart data={volumePerExercise} />
        </Box>
        <Box>
          <Typography variant="subtitle1" className={classes.graphTitle}>
            Top weight
          </Typography>
          <LineChart data={topWeigtPerExercise} />
        </Box>
      </Box>
    </Box>
  );
};
export default Progression;

const useStyles = makeStyles()(() => {
  return {
    title: { margin: theme.spacing(2, 0) },
    subtitleContainer: {
      display: "flex",
      gap: "16px",
      marginBottom: theme.spacing(4),
    },
    subtitle: { marginBottom: theme.spacing(2) },
    graphsContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: 4,
    },
    graphTitle: { marginBottom: theme.spacing(2) },
  };
});

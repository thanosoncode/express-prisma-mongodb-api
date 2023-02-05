import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { getSingleWorkout } from "../api/workouts";
import Calendar from "../components/calendar/Calendar.component";
import PieChart from "../components/charts/PieChart";
import ExercisesList from "../components/ExercisesList";
import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const Home = () => {
  const { classes, cx } = useStyles();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");

  const { data: workout } = useQuery(
    ["single-workout", selectedWorkoutId],
    () => getSingleWorkout(selectedWorkoutId)
  );

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">
        select a day in calendar for more details
      </Typography>
      <Typography variant="h6" className={classes.date}>
        {workout?.createdAt
          ? format(new Date(workout?.createdAt).getTime(), "dd/MM/yyyy")
          : ""}{" "}
        <b>{workout?.label}</b>
      </Typography>
      <Box className={classes.flexContainer}>
        <Calendar setSelectedWorkoutId={setSelectedWorkoutId} />
        <Box className={classes.details}>
          <PieChart data={workout?.exercises ?? []} />
          <Box className={classes.exercisesListContainer}>
            <ExercisesList exercises={workout?.exercises ?? []} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Home;

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "32px",
    marginTop: 8,
  },
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "32px",
  },
  date: { marginBottom: 2 },
  details: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  exercisesListContainer: {
    width: 350,
  },
}));

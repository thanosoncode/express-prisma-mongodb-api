import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getSingleWorkout } from "../../api/workouts";
import Calendar from "../../components/calendar/Calendar.component";
import PieChart from "../../components/charts/PieChart";
import ExercisesList from "../../components/exerciseList/ExercisesList.component";
import { useStyles } from "./Home.styles";

const Home = () => {
  const { classes } = useStyles();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");

  const { data: workout } = useQuery(
    ["single-workout", selectedWorkoutId],
    () => getSingleWorkout(selectedWorkoutId)
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Calendar setSelectedWorkoutId={setSelectedWorkoutId} />
        <Box className={classes.details}>
          <Box className={classes.exercisesListContainer}>
            <ExercisesList
              exercises={workout?.exercises ?? []}
              workout={workout}
              showTitle={true}
            />
          </Box>
          <PieChart data={workout?.exercises ?? []} />
        </Box>
      </Box>
    </Box>
  );
};
export default Home;

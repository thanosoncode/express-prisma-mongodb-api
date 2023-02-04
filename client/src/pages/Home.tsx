import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { getSingleWorkout } from "../api/workouts";
import Calendar from "../components/calendar/Calendar.component";
import PieChart from "../components/charts/PieChart";
import ExercisesList from "../components/ExercisesList";

const Home = () => {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");

  const { data: workout } = useQuery(
    ["single-workout", selectedWorkoutId],
    () => getSingleWorkout(selectedWorkoutId)
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
        marginTop: 8,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {!selectedWorkoutId && "select a day in calendar for more details"}
        {workout?.createdAt
          ? format(new Date(workout?.createdAt).getTime(), "dd/MM/yyyy")
          : ""}{" "}
        <b>{workout?.label}</b>
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Calendar setSelectedWorkoutId={setSelectedWorkoutId} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <PieChart data={workout?.exercises ?? []} />
          <Box sx={{ width: 350 }}>
            <ExercisesList exercises={workout?.exercises ?? []} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Home;

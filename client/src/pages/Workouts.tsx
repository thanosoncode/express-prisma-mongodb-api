import DeleteForever from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  IconButton,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteWorkout, getWorkouts } from "../api/workouts";
import { LONG_CACHE } from "../utils/constants";
import { Workout } from "../utils/models";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import ExercisesList from "../components/ExercisesList";
import { useState } from "react";
import FIlterBy from "../components/FIlterBy";
import PieChart from "../components/charts/PieChart";
import AddWorkout from "../components/AddWorkout";
import { makeStyles } from "tss-react/mui";
import theme from "../theme";

const Workouts = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const [selectedLabel, setSelectedLabel] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isAddWorkoutOpen, setisAddWorkoutOpen] = useState(false);

  const handleLabelChange = (event: SelectChangeEvent<string>) =>
    setSelectedLabel(event.target.value);

  const handleFilterByOpen = () => {
    setSelectedLabel("");
    setFiltersOpen(!filtersOpen);
  };

  const handleIsAddWorkoutOpen = () => setisAddWorkoutOpen(true);

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

  const filteredWorkouts = selectedLabel
    ? workouts && workouts.filter((w) => w.label === selectedLabel)
    : workouts;

  return (
    <Box>
      {isAddWorkoutOpen && (
        <AddWorkout setisAddWorkoutOpen={setisAddWorkoutOpen} />
      )}

      {isLoading ? <CircularProgress /> : null}
      {!isAddWorkoutOpen && (
        <>
          <Box className={classes.titleContainer}>
            <Typography variant="h6" className={classes.title}>
              My workouts
            </Typography>
            <FIlterBy
              filtersOpen={filtersOpen}
              selectedLabel={selectedLabel}
              handleFilterByOpen={handleFilterByOpen}
              handleLabelChange={handleLabelChange}
            />
            {!isAddWorkoutOpen && (
              <Button
                variant="contained"
                onClick={handleIsAddWorkoutOpen}
                className={classes.newWorkoutButton}
              >
                New Workout
              </Button>
            )}
          </Box>
          <Box className={classes.workoutsContainer}>
            {filteredWorkouts
              ? filteredWorkouts.map((workout: Workout) => {
                  const { id, label, exercises } = workout;
                  return (
                    <Box key={id} className={classes.workout}>
                      <Box sx={{ display: "flex" }}>
                        <Typography>{label}</Typography>
                        <IconButton onClick={() => (id ? mutate(id) : null)}>
                          <DeleteForever />
                        </IconButton>
                      </Box>
                      <Box className={classes.exercisesListContainer}>
                        <ExercisesList exercises={exercises}></ExercisesList>
                      </Box>
                    </Box>
                  );
                })
              : null}
          </Box>
        </>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isDeleting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
export default Workouts;

const useStyles = makeStyles()(() => {
  return {
    newWorkoutButton: { height: "min-content", marginLeft: "auto" },
    titleContainer: {
      display: "flex",
      justifyContent: "cetner",
      alignItems: "center",
      gap: "16px",
    },
    title: {
      margin: theme.spacing(2, 0),
    },
    workoutsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      justifyContent: "center",
      alignItems: "center",
    },
    workout: { minWidth: 400 },
    exercisesListContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "36px",
    },
  };
});

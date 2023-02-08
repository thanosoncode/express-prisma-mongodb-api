import DeleteForever from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  IconButton,
  SelectChangeEvent,
  Theme,
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
import AddWorkout from "../components/AddWorkout";
import { makeStyles } from "tss-react/mui";
import { format } from "date-fns";

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
                      <Box className={classes.workoutTitle}>
                        <Typography
                          variant="h6"
                          className={classes.workoutLabel}
                        >
                          {label}
                        </Typography>
                        <Typography variant="subtitle2">
                          {workout?.createdAt
                            ? format(
                                new Date(workout?.createdAt).getTime(),
                                "dd/MM/yyyy"
                              )
                            : ""}{" "}
                        </Typography>
                        <IconButton
                          onClick={() => (id ? mutate(id) : null)}
                          sx={{ padding: 0 }}
                        >
                          <DeleteForever />
                        </IconButton>
                      </Box>
                      <Box className={classes.exercisesListContainer}>
                        <ExercisesList
                          exercises={exercises}
                          showTitle={false}
                        ></ExercisesList>
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

const useStyles = makeStyles()((theme: Theme) => {
  return {
    newWorkoutButton: { height: "min-content", marginLeft: "auto" },
    titleContainer: {
      display: "flex",
      justifyContent: "cetner",
      alignItems: "center",
      gap: "16px",
      padding: theme.spacing(0, 4),
    },
    title: {
      margin: theme.spacing(2, 0),
    },
    workoutsContainer: {
      display: "flex",
      gap: "32px",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
    workout: { width: 380 },
    workoutTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      marginBottom: "4px",
    },
    workoutLabel: { textTransform: "capitalize" },
    exercisesListContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "36px",
    },
  };
});

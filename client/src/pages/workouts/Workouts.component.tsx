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
import { deleteWorkout, getWorkouts } from "../../api/workouts";
import { LONG_CACHE } from "../../utils/constants";
import { Workout } from "../../utils/models";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import ExercisesList from "../../components/exerciseList/ExercisesList.component";
import { useState } from "react";
import FIlterBy from "../../components/filterBy/FIlterBy.component";
import AddWorkout from "../../components/addWorkout/AddWorkout.component";
import { format } from "date-fns";
import { useStyles } from "./Workouts.styles";
import theme from "../../theme";

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

  const { mutate: deleteSelectedWorkout, isLoading: isDeleting } = useMutation(
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

      {!isAddWorkoutOpen && (
        <>
          <Box className={classes.titleContainer}>
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
            {isLoading && <CircularProgress />}
            {filteredWorkouts
              ? filteredWorkouts.map((workout: Workout) => {
                  const { id, label, exercises } = workout;
                  return (
                    <Box key={id} className={classes.workout}>
                      <Box className={classes.workoutTitle}>
                        <Typography
                          variant="subtitle2"
                          sx={{ paddingLeft: theme.spacing(1) }}
                        >
                          {workout?.createdAt
                            ? format(
                                new Date(workout?.createdAt).getTime(),
                                "dd/MM/yyyy"
                              )
                            : ""}{" "}
                        </Typography>
                        <Typography
                          variant="h6"
                          className={classes.workoutLabel}
                        >
                          {label}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            id ? deleteSelectedWorkout(id) : null
                          }
                          sx={{ padding: 0 }}
                        >
                          <DeleteForever sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                      <Box className={classes.exercisesListContainer}>
                        <ExercisesList
                          exercises={exercises}
                          showTitle={false}
                        />
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

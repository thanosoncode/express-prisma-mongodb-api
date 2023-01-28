import DeleteForever from "@mui/icons-material/DeleteForever";
import { Box, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteWorkout, getWorkouts } from "../api/workouts";
import { LONG_CACHE } from "../utils/constants";
import { Workout } from "../utils/models";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import ExercisesList from "../components/ExercisesList";
import { useState } from "react";
import FIlterBy from "../components/FIlterBy";

const Workouts = () => {
  const queryClient = useQueryClient();
  const [selectedLabel, setSelectedLabel] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleLabelChange = (event: SelectChangeEvent<string>) =>
    setSelectedLabel(event.target.value);

  const handleFilterByOpen = () => {
    setSelectedLabel("");
    setFiltersOpen(!filtersOpen);
  };

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
      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
          My workouts
        </Typography>
        <FIlterBy
          filtersOpen={filtersOpen}
          selectedLabel={selectedLabel}
          handleFilterByOpen={handleFilterByOpen}
          handleLabelChange={handleLabelChange}
        />
      </Box>
      {isLoading ? <CircularProgress /> : null}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {filteredWorkouts
          ? filteredWorkouts.map((workout: Workout) => {
              const { id, label, exercises } = workout;
              return (
                <Box key={id}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>{label}</Typography>
                    <IconButton onClick={() => (id ? mutate(id) : null)}>
                      <DeleteForever />
                    </IconButton>
                  </Box>
                  <ExercisesList exercises={exercises}></ExercisesList>
                </Box>
              );
            })
          : null}
      </Box>
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

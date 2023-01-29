import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getWorkouts } from "../api/workouts";
import theme from "../theme";
import { LONG_CACHE } from "../utils/constants";
import { Exercise, ExerciseWithVolumeAndDate } from "../utils/models";

const Charts = () => {
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

  const allPushPresses = getRecordsPerExercise("push press");
  const calculateVolume = (exercise: Exercise) =>
    Number(exercise.sets) * Number(exercise.reps) * Number(exercise.weight);

  const volumePerExercise = allPushPresses.map((ex) => ({
    name: ex.name,
    volume: calculateVolume(ex),
    sets: ex.sets,
    reps: ex.reps,
    weight: ex.weight,
    createdAt:
      new Date(ex.createdAt).getDate().toString() +
      "/" +
      (new Date(ex.createdAt).getMonth() + 1).toString(),
  }));

  return (
    <div>
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
        Charts
      </Typography>
      <BarChart width={640} height={360} data={volumePerExercise}>
        <Bar
          dataKey="volume"
          fill={theme.palette.primary.main}
          barSize={20}
          background={false}
          isAnimationActive={false}
        ></Bar>
        <Tooltip
          content={<CustomTooltip />}
          payload={volumePerExercise}
          cursor={{ fill: "none" }}
        />
        <Legend />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <YAxis dataKey="volume" />
        <XAxis dataKey="createdAt" />
      </BarChart>
    </div>
  );
};
export default Charts;

const CustomTooltip = ({
  active,
  payload,
}: {
  payload?: any;
  active?: boolean;
}) => {
  if (active && payload) {
    console.log(payload[0].payload.sets);
    return (
      <div>
        {payload[0].payload.sets}
        {"*"}
        {payload[0].payload.reps}
        {"*"}
        {payload[0].payload.weight}
      </div>
    );
  }

  return null;
};

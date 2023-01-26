import { useQuery } from "@tanstack/react-query";
import { getWorkouts } from "../api/workouts";
import { LONG_CACHE } from "../utils/constants";
import { Workout } from "../utils/models";

const Workouts = () => {
  const { data: workouts } = useQuery(["workouts"], getWorkouts, {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE,
  });

  return (
    <div>
      <h4>MyWorkouts</h4>
      {workouts
        ? workouts.map((workout: Workout) => {
            const {
              id,
              label,
              exercises: [{ name, sets, reps, weight }],
            } = workout;
            return (
              <div key={id}>
                <h5>{label}</h5>
                <div>
                  <span>name: {name}</span>
                  <span>sets: {sets}</span>
                  <span>reps: {reps}</span>
                  <span>weight: {weight}</span>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default Workouts;

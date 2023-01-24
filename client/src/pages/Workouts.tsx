import { useLoaderData } from "react-router-dom";
import { Workout } from "../utils/models";

const Workouts = () => {
  const workouts: any = useLoaderData();
  console.log(workouts);

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

export const loader = async () => {
  const response = await fetch("http://localhost:4444/api/workouts");
  const data = await response.json();
  return data;
};

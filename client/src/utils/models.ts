export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

export interface Workout {
  id: string;
  label: string;
  exercises: Exercise[];
}

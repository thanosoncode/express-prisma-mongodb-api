export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

export interface Workout {
  id?: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
  exercises: Exercise[];
}

export type ExerciseWithVolumeAndDate = {
  name: string;
  volume: number;
  sets: string;
  reps: string;
  weight: string;
  createdAt: string;
};

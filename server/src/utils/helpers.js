"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutIsValid = void 0;
const workoutIsValid = (label, exercises) => {
    const exercisesAreValid = exercises &&
        exercises.length > 0 &&
        exercises.every((exercise) => exercise.name && exercise.sets && exercise.reps && exercise.weight);
    const labelIsValid = label && label.length > 0;
    return exercisesAreValid && labelIsValid;
};
exports.workoutIsValid = workoutIsValid;

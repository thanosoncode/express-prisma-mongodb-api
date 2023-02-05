"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.updateWorkout = exports.getSingleWorkout = exports.createWorkout = exports.getWorkouts = void 0;
const prisma_1 = require("../../prisma/prisma");
const helpers_1 = require("../utils/helpers");
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workouts = yield prisma_1.prisma.workout.findMany();
    if (!workouts) {
        return res.status(400).json({ message: "no workouts" });
    }
    return res.status(200).json(workouts);
});
exports.getWorkouts = getWorkouts;
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { label, exercises } = req.body;
    if (!(0, helpers_1.workoutIsValid)(label, exercises)) {
        return res
            .status(400)
            .json({ message: "label and/or exercises are not valid" });
    }
    const workout = yield prisma_1.prisma.workout.create({
        data: {
            label,
            exercises,
        },
    });
    res.status(201).json(workout);
});
exports.createWorkout = createWorkout;
const getSingleWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(400).json({ message: "invalid id" });
    }
    const workout = yield prisma_1.prisma.workout.findFirst({
        where: {
            id,
        },
    });
    if (!workout) {
        return res.status(400).json({ message: "cant find workout with that id" });
    }
    return res.json(workout);
});
exports.getSingleWorkout = getSingleWorkout;
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { label, exercises } = req.body;
    if (id.length !== 24) {
        return res.status(400).json({ message: "invalid id" });
    }
    if (!(0, helpers_1.workoutIsValid)(label, exercises)) {
        return res
            .status(400)
            .json({ message: "label and/or exercises are not valid" });
    }
    const workout = yield prisma_1.prisma.workout.findFirst({
        where: {
            id,
        },
    });
    if (!workout) {
        return res
            .status(400)
            .json({ message: "could not find workout with that id" });
    }
    const updatedWorkout = yield prisma_1.prisma.workout.update({
        where: {
            id,
        },
        data: {
            label,
            exercises,
        },
    });
    return res.status(200).json(updatedWorkout);
});
exports.updateWorkout = updateWorkout;
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(400).json({ message: "invalid id" });
    }
    const workout = yield prisma_1.prisma.workout.findFirst({
        where: {
            id,
        },
    });
    if (!workout) {
        return res
            .status(400)
            .json({ message: "could not find workout with that id" });
    }
    yield prisma_1.prisma.workout.delete({
        where: {
            id,
        },
    });
    return res.status(200).json(workout);
});
exports.deleteWorkout = deleteWorkout;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const workoutControllers_1 = require("../controllers/workoutControllers");
const router = express_1.default.Router();
exports.router = router;
router.route("/").get(workoutControllers_1.getWorkouts).post(workoutControllers_1.createWorkout);
router
    .route("/:id")
    .get(workoutControllers_1.getSingleWorkout)
    .put(workoutControllers_1.updateWorkout)
    .delete(workoutControllers_1.deleteWorkout);

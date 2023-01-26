import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Exercise } from "../utils/models";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface AddExerciseProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const AddExercise: React.FC<AddExerciseProps> = (props) => {
  const emptyExercise = { name: "", sets: "0", reps: "0", weight: "" };

  const [exercise, setExercise] = useState<Exercise>(emptyExercise);
  const [inValidExercise, setInvalidExercise] = useState(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setExercise({
      ...exercise,
      [event.target.name]: event.target.value.toString(),
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExercise({
      ...exercise,
      [event.target.name]: event.target.value.toString(),
    });
  };

  const handleAddExercise = () => {
    const exerciseIsValid =
      exercise.sets !== "0" &&
      exercise.reps !== "0" &&
      exercise.name !== "" &&
      exercise.weight !== "";
    if (!exerciseIsValid) {
      setInvalidExercise(true);
      return;
    }

    props.setExercises([...props.exercises, exercise]);
    setExercise(emptyExercise);
    setInvalidExercise(false);
  };

  return (
    <>
      {inValidExercise ? "all fields are required" : ""}
      <Box>
        <FormControl>
          <InputLabel id="sets">sets</InputLabel>
          <Select
            id="sets"
            name="sets"
            label="sets"
            labelId="sets"
            value={exercise?.sets}
            onChange={handleSelectChange}
          >
            {new Array(11).fill(null).map((_, index) => (
              <MenuItem key={index} value={index.toString()}>
                {index.toString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="reps">reps</InputLabel>
          <Select
            id="reps"
            name="reps"
            label="reps"
            labelId="reps"
            value={exercise?.reps}
            onChange={handleSelectChange}
          >
            {new Array(21).fill(null).map((_, index) => (
              <MenuItem key={index} value={index.toString()}>
                {index.toString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="weight"
          name="weight"
          label="weight"
          variant="outlined"
          type="number"
          value={exercise.weight}
          onChange={handleInputChange}
        />
        <TextField
          id="name"
          name="name"
          label="name"
          variant="outlined"
          value={exercise.name}
          onChange={handleInputChange}
        />
        <Button variant="outlined" onClick={handleAddExercise}>
          add
        </Button>
      </Box>
    </>
  );
};
export default AddExercise;

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { possibleExercises } from "../utils/constants";

interface SelectByExerciseProps {
  onChange: (event: SelectChangeEvent) => void;
  value: string;
  options?: string[];
}

const SelectByExercise: React.FC<SelectByExerciseProps> = ({
  onChange,
  value,
  options = possibleExercises,
}) => {
  return (
    <FormControl variant="standard" sx={{ minWidth: 200 }}>
      <InputLabel id="name" sx={{ width: 200 }}>
        exercise
      </InputLabel>
      <Select
        id="name"
        name="name"
        label="name"
        labelId="name"
        value={value}
        onChange={onChange}
        autoWidth
      >
        {options.map((ex) => (
          <MenuItem key={ex} value={ex}>
            {ex}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SelectByExercise;

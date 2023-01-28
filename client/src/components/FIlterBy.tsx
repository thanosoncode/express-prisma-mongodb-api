import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { workoutLabels } from "../utils/constants";
import { Tune } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import theme from "../theme";

interface FilterByProps {
  filtersOpen: boolean;
  selectedLabel: string;
  handleLabelChange: (event: SelectChangeEvent<string>) => void;
  handleFilterByOpen: () => void;
}

const FIlterBy: React.FC<FilterByProps> = ({
  handleLabelChange,
  selectedLabel,
  filtersOpen,
  handleFilterByOpen,
}) => {
  return (
    <>
      <IconButton onClick={handleFilterByOpen}>
        <Tune sx={{ color: filtersOpen ? theme.palette.primary.main : "" }} />
      </IconButton>
      {filtersOpen ? (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel id="filter-by-label">Filter by</InputLabel>
          <Select
            id="filter-by-label"
            label="Filter by"
            labelId="filter-by-label"
            value={selectedLabel}
            onChange={handleLabelChange}
          >
            {workoutLabels.map((label) => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
    </>
  );
};
export default FIlterBy;

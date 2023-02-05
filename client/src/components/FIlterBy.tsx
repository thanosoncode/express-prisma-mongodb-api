import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { workoutLabels } from "../utils/constants";
import { Tune } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import theme from "../theme";
import { useQueryClient } from "@tanstack/react-query";
import { Workout } from "../utils/models";
import { makeStyles } from "tss-react/mui";

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
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  //@ts-ignore
  const workouts: Workout[] = queryClient.getQueriesData(["workouts"])[0][1];

  const timesPerWorkout =
    workouts &&
    workouts.reduce((acc: { [key: string]: number }, workout) => {
      if (acc[workout.label]) {
        acc[workout.label]++;
      } else {
        acc[workout.label] = 1;
      }
      return acc;
    }, {});

  return (
    <>
      <IconButton onClick={handleFilterByOpen}>
        <Tune sx={{ color: selectedLabel ? theme.palette.primary.main : "" }} />
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
            {workoutLabels.map((label) => {
              const amount = timesPerWorkout[label];
              return (
                <MenuItem
                  key={label}
                  value={label}
                  className={classes.menuItem}
                >
                  <span> {label}</span>
                  <span className={amount ? classes.amount : ""}>{amount}</span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : null}
    </>
  );
};
export default FIlterBy;

const useStyles = makeStyles()(() => {
  return {
    menuItem: {
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
    },
    amount: {
      width: 20,
      height: 20,
      backgroundColor: theme.palette.primary.main,
      borderRadius: "50%",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 14,
    },
  };
});

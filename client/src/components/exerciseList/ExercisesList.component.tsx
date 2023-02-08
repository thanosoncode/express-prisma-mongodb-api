import { Exercise, Workout } from "../../utils/models";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

interface ExercisesListProps {
  exercises: Exercise[];
  workout?: Workout | null;
  showTitle: boolean;
}

const ExercisesList: React.FC<ExercisesListProps> = ({
  exercises,
  workout,
  showTitle,
}) => {
  const { classes } = useStyles();
  console.log(workout?.createdAt);
  return (
    <>
      {showTitle && (
        <Typography variant="h6" className={classes.date}>
          {workout?.createdAt
            ? format(new Date(workout?.createdAt).getTime(), "dd/MM/yyyy")
            : ""}{" "}
          <b>{workout?.label}</b>
        </Typography>
      )}
      {exercises && exercises.length > 0 ? (
        <TableContainer component={Paper} sx={{ height: "min-content" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>name</TableCell>
                <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                  sets
                </TableCell>
                <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                  reps
                </TableCell>
                <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                  weight
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map((ex, index) => (
                <TableRow key={index}>
                  <TableCell>{ex.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{ex.sets}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{ex.reps}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {ex.weight}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};
export default ExercisesList;

export const useStyles = makeStyles()((theme: Theme) => ({
  date: { marginBottom: 8, textAlign: "center" },
}));

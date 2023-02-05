import { Exercise } from "../utils/models";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface ExercisesListProps {
  exercises: Exercise[];
}

const ExercisesList: React.FC<ExercisesListProps> = (props) => {
  return (
    <>
      {props.exercises && props.exercises.length > 0 ? (
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
              {props.exercises.map((ex, index) => (
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

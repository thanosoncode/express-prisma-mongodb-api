import Box from "@mui/material/Box";
import { useStyles } from "./DaysView.styles";

interface DaysViewProps {
  year: number;
  month: number;
}

const DaysView: React.FC<DaysViewProps> = ({ year, month }) => {
  const { classes } = useStyles();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getWhatDayIsTheFirst = (year: number, month: number) => {
    return new Date(year, month - 1, 1).toString().split(" ")[0];
  };

  const getEmptyCells = (day: string) => {
    switch (day) {
      case "Sun":
        return 0;
      case "Mon":
        return 1;
      case "Tue":
        return 2;
      case "Wed":
        return 3;
      case "Thu":
        return 4;
      case "Fri":
        return 5;
      case "Sat":
        return 6;
      default:
        return 0;
    }
  };

  return (
    <Box className={classes.days}>
      <span>S</span>
      <span>M</span>
      <span>T</span>
      <span>W</span>
      <span>T</span>
      <span>F</span>
      <span>S</span>
      {new Array(getEmptyCells(getWhatDayIsTheFirst(year, month)))
        .fill(null)
        .map((_, index) => (
          <span key={index}></span>
        ))}
      {new Array(getDaysInMonth(year, month)).fill(null).map((_, index) => (
        <span key={index + 1} className={classes.day}>
          {index + 1}
        </span>
      ))}
    </Box>
  );
};
export default DaysView;

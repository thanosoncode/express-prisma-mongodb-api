import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme: Theme) => ({
  days: {
    display: "grid",
    gridTemplateColumns: "repeat(7,50px)",
    gridTemplateRows: "repeat(6,50px)",
    alignItems: "center",
    justifyItems: "center",
    width: "min-content",
    fontSize: "14px",
  },
  day: {
    cursor: "pointer",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    "&: hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme: Theme) => ({
  navbarRoot: {
    display: "flex",
    gap: 12,
    padding: theme.spacing(2, 0),
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  navbarRight: {
    display: "flex",
    gap: 12,
  },
}));

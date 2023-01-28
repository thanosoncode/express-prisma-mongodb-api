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
    color: "black",
    borderBottom: `1px solid transparent`,
    paddingLeft: 2,
    paddingRight: 2,
  },
  navbarRight: {
    display: "flex",
    gap: 12,
  },
  active: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    transition: "0.2s ease-out",
  },
}));

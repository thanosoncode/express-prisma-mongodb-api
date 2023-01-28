import { Box } from "@mui/material";
import { useStyles } from "./Navbar.styles";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();

  return (
    <Box className={classes.navbarRoot}>
      <NavLink
        to="/"
        className={cx({
          [classes.link]: true,
          [classes.active]: pathname === "/",
        })}
      >
        home
      </NavLink>
      <Box className={classes.navbarRight}>
        <NavLink
          to="/workouts"
          className={cx({
            [classes.link]: true,
            [classes.active]: pathname === "/workouts",
          })}
        >
          my workouts
        </NavLink>
        <NavLink
          to="/add-workout"
          className={cx({
            [classes.link]: true,
            [classes.active]: pathname === "/add-workout",
          })}
        >
          add workout
        </NavLink>
      </Box>
    </Box>
  );
};
export default Navbar;

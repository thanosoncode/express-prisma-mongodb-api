import { Box } from "@mui/material";
import { useStyles } from "./Navbar.styles";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.navbarRoot}>
      <Link to="/" className={classes.link}>
        home
      </Link>
      <Box className={classes.navbarRight}>
        <Link to="/workouts" className={classes.link}>
          my workouts
        </Link>
        <Link to="/add-workout" className={classes.link}>
          add workout
        </Link>
      </Box>
    </Box>
  );
};
export default Navbar;

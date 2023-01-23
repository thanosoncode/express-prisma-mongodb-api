import { Box, Link } from "@mui/material";
import { useStyles } from "./Navbar.styles";

const Navbar = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.navbarRoot}>
      <Link href="/" underline="none" className={classes.link}>
        home
      </Link>
      <Box className={classes.navbarRight}>
        <Link href="/about" underline="none" className={classes.link}>
          my workouts
        </Link>
        <Link href="/contact" underline="none" className={classes.link}>
          add workout
        </Link>
      </Box>
    </Box>
  );
};
export default Navbar;

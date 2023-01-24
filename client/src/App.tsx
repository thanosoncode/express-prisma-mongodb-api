import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./components/RootLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Box } from "@mui/material";
import Workouts from "./pages/Workouts";
import AddWorkout from "./pages/AddWorkout";
import Error from "./components/Error";
import { loader as workoutsLoader } from "./pages/Workouts";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route index element={<Home />} errorElement={<Error />} />
        <Route
          path="/workouts"
          element={<Workouts />}
          loader={workoutsLoader}
          errorElement={<Error />}
        />
        <Route
          path="/add-workout"
          element={<AddWorkout />}
          errorElement={<Error />}
        />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        style={{
          background: theme.palette.common.bg,
          color: theme.palette.common.white,
          height: "100vh",
        }}
      >
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
};
export default App;

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
import Charts from "./pages/Charts";
import Error from "./components/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route index element={<Home />} errorElement={<Error />} />
        <Route
          path="/workouts"
          element={<Workouts />}
          errorElement={<Error />}
        />
        <Route
          path="/add-workout"
          element={<AddWorkout />}
          errorElement={<Error />}
        />
        <Route path="/charts" element={<Charts />} errorElement={<Error />} />
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          style={{
            background: "#fafafa",
            color: "black",
            minHeight: "100vh",
            overflowX: "hidden",
            marginRight: "calc(-1 * (100vw - 100%))",
          }}
        >
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
export default App;

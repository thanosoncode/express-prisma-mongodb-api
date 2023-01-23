import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import RoutLayout from "./components/RoutLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Box } from "@mui/material";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RoutLayout />}>
        <Route index element={<Home />} />
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

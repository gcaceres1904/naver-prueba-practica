import "./App.css";
import { AppRouter } from "./AppRouter.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouter />
    </LocalizationProvider>
  );
}

export default App;

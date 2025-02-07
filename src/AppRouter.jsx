import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { PaginaPrincipal } from "./pages";

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

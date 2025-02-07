import { Box } from "@mui/material";
import Plantilla from "../components/Plantilla.jsx";
import { useEffect, useState } from "react";
import { ContenidoLanding } from "../components/ContenidoLanding.jsx";

export const PaginaPrincipal = () => {
  const baseURL = "http://localhost:3000";
  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [elementoInterno, setElementoInterno] = useState(<Box></Box>);

  useEffect(() => {
    setElementoInterno(
      <ContenidoLanding
        setOpen={setOpen}
        setSeverity={setSeverity}
        setSnackBarMessage={setSnackBarMessage}
        setElementoInterno={setElementoInterno}
        baseURL={baseURL}
      />,
    );
  }, []);

  return (
    <Plantilla
      open={open}
      setOpen={setOpen}
      snackBarMessage={snackBarMessage}
      severity={severity}
    >
      {elementoInterno}
    </Plantilla>
  );
};

export default PaginaPrincipal;

import { Alert, Box, Container, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const Plantilla = ({ children, open, setOpen, snackBarMessage, severity }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "99.9%",
        height: "99.7%",
        backgroundImage: "url(/gradient.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "24px",
        border: "1px solid black",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "85%",
          background:
            "linear-gradient(180deg, rgba(71,71,71,1) 0%, rgba(3,3,3,1) 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          border: "1px solid black",
          borderRadius: "2rem",
        }}
      >
        {children}
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

Plantilla.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  snackBarMessage: PropTypes.string,
  severity: PropTypes.string,
};

export default Plantilla;

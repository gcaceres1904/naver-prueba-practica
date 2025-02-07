import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { FirstPage } from "@mui/icons-material";
import { ContenidoLanding } from "./ContenidoLanding.jsx";
import { ContenidoQuoteHistory } from "./ContenidoQuoteHistory.jsx";
import { ContenidoCustomerData } from "./ContenidoCustomerData.jsx";

export const ContenidoSelectOption = ({
  setOpen,
  setSeverity,
  setSnackBarMessage,
  setElementoInterno,
  baseURL,
}) => {
  const navigateQuoteHistory = async () => {
    setElementoInterno(
      <ContenidoQuoteHistory
        setOpen={setOpen}
        setSeverity={setSeverity}
        setSnackBarMessage={setSnackBarMessage}
        setElementoInterno={setElementoInterno}
        baseURL={baseURL}
      />,
    );
  };

  const navigateCustomerData = async () => {
    setElementoInterno(
      <ContenidoCustomerData
        setOpen={setOpen}
        setSeverity={setSeverity}
        setSnackBarMessage={setSnackBarMessage}
        setElementoInterno={setElementoInterno}
        baseURL={baseURL}
      />,
    );
  };

  const regresarLogin = async () => {
    setElementoInterno(
      <ContenidoLanding
        setOpen={setOpen}
        setSeverity={setSeverity}
        setSnackBarMessage={setSnackBarMessage}
        setElementoInterno={setElementoInterno}
        baseURL={baseURL}
      />,
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Box sx={{ alignSelf: "flex-start" }}>
        <Button
          variant="text"
          color="white"
          size="small"
          startIcon={<FirstPage fontSize={"large"} color={"white"} />}
          onClick={regresarLogin}
        >
          <Typography variant={"h6"}>LOG IN</Typography>
        </Button>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          height: "60dvh",
          background:
            "linear-gradient(180deg, rgba(71,71,71,1) 0%, rgba(3,3,3,1) 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          border: "1px solid gold",
          borderRadius: "2rem",
          width: "50dvw",
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(71,71,71,1) 0%, rgba(3,3,3,1) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid gold",
          }}
        >
          <Stack
            direction="column"
            component="iconbutton"
            sx={{
              borderRadius: "2rem",
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            onClick={navigateCustomerData}
          >
            <img
              src={"/icono_explorador.png"}
              alt={"icono art experience"}
              width={"300dvw"}
            />
            <Typography variant={"h4"} fontWeight={"bold"}>
              NEW TOUR
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ position: "relative", zIndex: 0 }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "linear-gradient(180deg, rgba(71,71,71,1) 0%, rgba(3,3,3,1) 100%)",
              borderRadius: "50%",
              paddingTop: "8px",
              paddingX: "6px",
              zIndex: 1,
              border: "1px solid gold",
            }}
          >
            <img
              src={"/icono_art_experience.png"}
              alt={"icono art experience"}
              width={"70dvw"}
            />
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(71,71,71,1) 0%, rgba(3,3,3,1) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: "1px solid gold",
          }}
        >
          <Stack
            direction="column"
            component="IconButton"
            sx={{
              borderRadius: "2rem",
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            onClick={navigateQuoteHistory}
          >
            <img
              src={"/icono_busqueda.png"}
              alt={"icono art experience"}
              width={"300dvw"}
            />
            <Typography variant={"h4"} fontWeight={"bold"}>
              SEARCH TOUR
            </Typography>
          </Stack>
        </Box>
      </Container>

      <Box sx={{ alignSelf: "center" }}>
        <Typography variant={"body2"}>
          Please select the option relevant to your need
        </Typography>
      </Box>
    </Box>
  );
};
ContenidoSelectOption.propTypes = {
  setOpen: PropTypes.func,
  setSeverity: PropTypes.func,
  setSnackBarMessage: PropTypes.func,
  baseURL: PropTypes.string,
  setElementoInterno: PropTypes.func,
};

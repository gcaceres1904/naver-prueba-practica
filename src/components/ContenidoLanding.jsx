import { FormContainer } from "react-hook-form-mui";
import { Box, Button, Grid2, Typography } from "@mui/material";
import StyledTextFieldElement from "./StyledTextFieldElement.jsx";
import StyledPasswordElement from "./StyledPasswordElement.jsx";
import { useForm } from "react-hook-form";
import { getRequest } from "../httpService.js";
import PropTypes from "prop-types";

export const ContenidoLanding = ({
  setOpen,
  setSeverity,
  setSnackBarMessage,
  setElementoInterno,
  baseURL,
}) => {
  const formContext = useForm({ defaultValues: {} });
  const { handleSubmit, watch } = formContext;

  const iniciarSesion = async () => {
    try {
      const userRequest = await getRequest(
        baseURL,
        `/users?username=${watch("username")}`,
      );
      setOpen(false);
      if (userRequest?.data[0]?.password === watch("password")) {
        setSeverity("success");
        setSnackBarMessage(`Welcome ${watch("username")}`);
      } else {
        setSeverity("error");
        setSnackBarMessage(
          `Your password or username are not correct. Have you forgot your password?`,
        );
      }
      setOpen(true);
    } catch (e) {
      console.error(e);
      setSeverity("error");
      setSnackBarMessage(`Error during login`);
      setOpen(true);
    }
  };

  const recuperarPassword = async () => {
    setElementoInterno(<Box></Box>);
  };

  return (
    <Box>
      <FormContainer
        mode={"onBlur"}
        formContext={formContext}
        handleSubmit={handleSubmit(iniciarSesion)}
      >
        <Grid2
          container
          rowSpacing={"0.75rem"}
          sx={{
            paddingY: "2dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Centrar el contenido del contenedor principal
          }}
          columnSpacing={{ xs: 5, sm: 8 }}
        >
          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", 
            }}
          >
            <img src={"/logo_art_experiences_travel.png"} alt="Logo Art Travel" width={"40%"} />
          </Grid2>

          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              marginTop: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Centrar el contenido de este Grid2
            }}
          >
            <Typography variant="h4" fontWeight={"bold"}>
              WELCOME!
            </Typography>
          </Grid2>

          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledTextFieldElement
              label={"Username"}
              name={"username"}
              sx={{ width: "40%" }}
            />
          </Grid2>

          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledPasswordElement
              label={"Password"}
              name={"password"}
              sx={{ width: "40%" }}
            />
          </Grid2>

          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              color={"#707070"}
              component={"a"}
              onClick={recuperarPassword}
            >
              Forgot Password?
            </Typography>
          </Grid2>

          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                width: "40%",
                backgroundColor: "#303030",
                color: "white",
                borderRadius: "2rem",
                paddingY: "0.7rem",
              }}
              type="submit"
            >
              <Typography variant="h5" fontWeight={"bold"}>
                SIGN IN
              </Typography>
            </Button>
          </Grid2>
        </Grid2>
      </FormContainer>
    </Box>
  );
};
ContenidoLanding.propTypes = {
  setOpen: PropTypes.func,
  setSeverity: PropTypes.func,
  setSnackBarMessage: PropTypes.func,
  baseURL: PropTypes.string,
  setElementoInterno: PropTypes.func,
};

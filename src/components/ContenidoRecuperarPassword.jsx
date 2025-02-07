import { FormContainer } from "react-hook-form-mui";
import { Box, Button, Grid2, Typography } from "@mui/material";
import StyledTextFieldElement from "./StyledTextFieldElement.jsx";
import { useForm } from "react-hook-form";
import { getRequest } from "../httpService.js";
import PropTypes from "prop-types";
import { FirstPage } from "@mui/icons-material";
import { ContenidoLanding } from "./ContenidoLanding.jsx";

export const ContenidoRecuperarPassword = ({
  setOpen,
  setSeverity,
  setSnackBarMessage,
  setElementoInterno,
  baseURL,
}) => {
  const formContext = useForm({ defaultValues: {} });
  const { handleSubmit, watch } = formContext;

  const enviarRecuperacionPassword = async () => {
    try {
      const userRequest = await getRequest(
        baseURL,
        watch("email")
          ? `/users?email=${watch("email")}`
          : `/users?username=${watch("username")}`,
      );
      setOpen(false);
      if (userRequest?.data[0]) {
        setSeverity("success");
        setSnackBarMessage(`Please follow the instructions sent to your inbox`);
      } else {
        setSeverity("error");
        setSnackBarMessage("No user found with that email or username");
      }
      setOpen(true);
    } catch (e) {
      console.error(e);
      setSeverity("error");
      setSnackBarMessage(`Error sending password reset`);
      setOpen(true);
    }
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
    <Box>
      <FormContainer
        mode={"onBlur"}
        formContext={formContext}
        handleSubmit={handleSubmit(enviarRecuperacionPassword)}
      >
        <Grid2
          container
          rowSpacing={"0.75rem"}
          sx={{
            paddingY: "2dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          columnSpacing={{ xs: 5, sm: 8 }}
        >
          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Button
              variant="text"
              color="white"
              size="small"
              startIcon={
                <FirstPage fontSize={"large"} color={"white"}></FirstPage>
              }
              onClick={regresarLogin}
            >
              <Typography variant={"h6"}>LOG IN</Typography>
            </Button>
          </Grid2>
          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={"/icono_ciberseguridad.png"}
              alt="Logo Art Travel"
              width={"150dvw"}
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
            <Typography variant="h6" fontWeight={"bold"}>
              {"DON'T WORRY, IT HAPPENS TO THE BEST OF US"}
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
            <Typography variant="body2" sx={{ width: "30%" }}>
              {
                "Fill in the box bellow, we wil sent you the steps to reset your password to the registered email."
              }
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
              disabled={watch("email")}
              label={"Username"}
              name={"username"}
              sx={{ width: "40%" }}
              rules={{
                validate: (value) => {
                  if (!value && !watch("email")) {
                    return `Email or username is required`;
                  }
                  return true;
                },
              }}
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
            <Typography variant="h6" fontWeight={"bold"}>
              -OR-
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
              disabled={watch("username")}
              label={"Email"}
              name={"email"}
              sx={{ width: "40%" }}
              rules={{
                validate: (value) => {
                  if (!value && !watch("username")) {
                    return `Email or username is required`;
                  }
                  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "Email is not valid";
                  }
                  return true;
                },
              }}
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
                SEND
              </Typography>
            </Button>
          </Grid2>
        </Grid2>
      </FormContainer>
    </Box>
  );
};
ContenidoRecuperarPassword.propTypes = {
  setOpen: PropTypes.func,
  setSeverity: PropTypes.func,
  setSnackBarMessage: PropTypes.func,
  baseURL: PropTypes.string,
  setElementoInterno: PropTypes.func,
};

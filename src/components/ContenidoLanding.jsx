import { FormContainer } from "react-hook-form-mui";
import { Box, Button, Grid2, Typography } from "@mui/material";
import StyledTextFieldElement from "./StyledTextFieldElement.jsx";
import StyledPasswordElement from "./StyledPasswordElement.jsx";
import { useForm } from "react-hook-form";
import { getRequest } from "../httpService.js";
import PropTypes from "prop-types";
import { ContenidoRecuperarPassword } from "./ContenidoRecuperarPassword.jsx";
import { ContenidoSelectOption } from "./ContenidoSelectOption.jsx";

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
        setElementoInterno(
          <ContenidoSelectOption
            setOpen={setOpen}
            setSeverity={setSeverity}
            setSnackBarMessage={setSnackBarMessage}
            setElementoInterno={setElementoInterno}
            baseURL={baseURL}
          />,
        );
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
    setElementoInterno(
      <ContenidoRecuperarPassword
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
        handleSubmit={handleSubmit(iniciarSesion)}
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
              justifyContent: "center",
            }}
          >
            <img
              src={"/logo_art_experiences_travel.png"}
              alt="Logo Art Travel"
              width={"500dvw"}
            />
          </Grid2>

          <Grid2
            size={{ xs: 12, sm: 12 }}
            sx={{
              marginTop: "2.5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              rules={{
                validate: (value) => {
                  if (!value) {
                    return `Username is required`;
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
            <StyledPasswordElement
              label={"Password"}
              name={"password"}
              sx={{ width: "40%" }}
              rules={{
                validate: (value) => {
                  if (!value) {
                    return `Password is required`;
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

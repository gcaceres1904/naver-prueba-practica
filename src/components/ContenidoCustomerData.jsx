import { AutocompleteElement, FormContainer } from "react-hook-form-mui";
import { Box, Button, Grid2, Typography } from "@mui/material";
import StyledTextFieldElement from "./StyledTextFieldElement.jsx";
import { useForm } from "react-hook-form";
import { getRequest, postRequest } from "../httpService.js";
import PropTypes from "prop-types";
import { FirstPage } from "@mui/icons-material";
import { ContenidoSelectOption } from "./ContenidoSelectOption.jsx";
import { useCallback, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const ContenidoCustomerData = ({
  setOpen,
  setSeverity,
  setSnackBarMessage,
  setElementoInterno,
  baseURL,
}) => {
  const formContext = useForm({ defaultValues: {} });
  const { handleSubmit, getValues, setValue, watch } = formContext;
  const [customerTypes, setCustomerTypes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [mainTourReferences, setMainTourReferences] = useState([]);

  const regexNumeroTelefono =
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

  const handleChangeAutocomplete = (newValue, name) => {
    setValue(name, newValue?.id);
  };

  const fetchQuotes = useCallback(async () => {
    try {
      const quoteRequest = await getRequest(baseURL, `/quotes`);
      setOpen(false);
      if (quoteRequest?.data) {
        setMainTourReferences(quoteRequest.data);
      }
    } catch (e) {
      console.error(e);
      setSeverity("error");
      setSnackBarMessage(`Error during fetch`);
    }
  }, [baseURL, setOpen, setSeverity, setSnackBarMessage]);

  const fetchCustomerTypes = useCallback(async () => {
    try {
      const customerTypesRequests = await getRequest(baseURL, `/customerType`);
      setOpen(false);
      if (customerTypesRequests?.data) {
        console.log(customerTypesRequests?.data);
        setCustomerTypes(customerTypesRequests.data);
      }
    } catch (e) {
      console.error(e);
      setSeverity("error");
      setSnackBarMessage(`Error during fetching`);
    }
  }, [baseURL, setOpen, setSeverity, setSnackBarMessage]);

  const fetchLanguages = useCallback(async () => {
    try {
      const languagesRequest = await getRequest(baseURL, `/languages`);
      setOpen(false);
      if (languagesRequest?.data) {
        setLanguages(languagesRequest.data);
      }
    } catch (e) {
      console.error(e);
      setSeverity("error");
      setSnackBarMessage(`Error during fetching`);
    }
  }, [baseURL, setOpen, setSeverity, setSnackBarMessage]);

  useEffect(() => {
    fetchLanguages();
    fetchCustomerTypes();
    fetchQuotes();
  }, [fetchCustomerTypes, fetchLanguages, fetchQuotes]);

  useEffect(() => {
    setValue(
      "travelCode",
      watch("referencePassenger") + "X" + watch("numberPassengers") + "-001",
    );
  }, [watch("referencePassenger"), watch("numberPassengers")]);

  const estilosCamposGrises = {
    backgroundColor: "#EFEFEF",
    "& .MuiFilledInput-root": {
      borderRadius: "2rem",
      backgroundColor: "#EFEFEF",
      "&:before": {
        borderBottomColor: "transparent",
      },
      "&:after": {
        borderBottomColor: "transparent",
      },
    },
    input: {
      color: "gray",
      textAlign: "center",
    },
  };

  const estilosAutocompleteGrises = {
    backgroundColor: "#EFEFEF",
    borderRadius: "5rem",
    "& .MuiOutlinedInput-root": {
      borderRadius: "5rem", // Aquí ajustas el borde redondeado
    },
    "& .MuiInputBase-input": {
      borderRadius: "5rem", // Asegúrate de que el input interno también tenga bordes redondeados
    },
  };

  const enviarRecuperacionPassword = async () => {
    try {
      await postRequest(baseURL, "/customers", getValues());
      setOpen(false);
      setSeverity("success");
      setSnackBarMessage(`Client Saved`);
      setOpen(true);
    } catch (e) {
      console.error(e);
      setSeverity("error");
      setSnackBarMessage(`Error sending password reset`);
      setOpen(true);
    }
  };

  const navigateTourType = async () => {
    setElementoInterno(
      <ContenidoSelectOption
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
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "20dvh",
          backgroundImage: "url(/nevado.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          border: "1px solid black",
        }}
      >
        <Button
          sx={{ alignSelf: "flex-start" }}
          variant="text"
          color="white"
          size="small"
          startIcon={<FirstPage fontSize={"large"} color={"white"}></FirstPage>}
          onClick={navigateTourType}
        >
          <Typography variant={"h6"}>Tour Type</Typography>
        </Button>
      </Box>

      <Box sx={{ width: "100%" }}>
        <FormContainer
          mode={"onBlur"}
          formContext={formContext}
          handleSubmit={handleSubmit(enviarRecuperacionPassword)}
        >
          <Grid2
            container
            rowSpacing={"0.50rem"}
            sx={{
              paddingY: "2dvh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              paddingX: "1dvw",
            }}
            columnSpacing={"0.75rem"}
          >
            <Grid2
              size={{ xs: 12, sm: 3 }}
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                borderBottom: "1px solid gold",
              }}
            >
              <Typography variant={"h6"} color={"gray"}>
                Customer Type
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <AutocompleteElement
                name={"customerTypeId"}
                options={customerTypes}
                fullWidth
                autocompleteProps={{
                  getOptionLabel: (option) => option.name,
                  getOptionKey: (option) => option.id,
                  onChange: (event, value) =>
                    handleChangeAutocomplete(value, "customerTypeId"),
                  disableClearable: true,
                  sx: estilosAutocompleteGrises,
                }}
                rules={{
                  validate: (value) => {
                    if (!value) {
                      return `Customer Type is required`;
                    }
                    return true;
                  },
                }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 3 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledTextFieldElement
                sx={estilosCamposGrises}
                label={"Cell Phone Number"}
                name={"cellPhoneNumber"}
                fullWidth
                rules={{
                  validate: (value) => {
                    if (!value) {
                      return `Cellphone Number is required`;
                    }
                    if (value && regexNumeroTelefono.test(value)) {
                      return `The phone number must include the country code and start with a + and a space between the code and the number`;
                    }
                    return true;
                  },
                }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 1 }}
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                borderBottom: "1px solid gold",
              }}
            >
              <Typography variant={"h6"} color={"gray"}>
                Language
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2 }}>
              <AutocompleteElement
                name={"languageId"}
                options={languages}
                fullWidth
                autocompleteProps={{
                  getOptionLabel: (option) => option.name,
                  getOptionKey: (option) => option.id,
                  onChange: (event, value) =>
                    handleChangeAutocomplete(value, "languageId"),
                  disableClearable: true,
                  sx: estilosAutocompleteGrises,
                }}
                rules={{
                  validate: (value) => {
                    if (!value) {
                      return `Language is required`;
                    }
                    return true;
                  },
                }}
              />
            </Grid2>
            {watch("customerTypeId") == 3 ? (
              <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledTextFieldElement
                  sx={estilosCamposGrises}
                  label={"Company Name"}
                  name={"companyName"}
                  fullWidth
                  rules={{
                    validate: (value) => {
                      if (!value) {
                        return `Company Name is required`;
                      }
                      return true;
                    },
                  }}
                />
              </Grid2>
            ) : (
              <></>
            )}
            {watch("customerTypeId") == 1 || watch("customerTypeId") == 2 ? (
              <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledTextFieldElement
                  sx={estilosCamposGrises}
                  label={"Name"}
                  name={"name"}
                  fullWidth
                  rules={{
                    validate: (value) => {
                      if (!value) {
                        return `Name is required`;
                      }
                      return true;
                    },
                  }}
                />
              </Grid2>
            ) : (
              <></>
            )}
            <Grid2
              size={{ xs: 12, sm: 6 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledTextFieldElement
                sx={estilosCamposGrises}
                label={"Address"}
                name={"address"}
                fullWidth
              />
            </Grid2>
            {watch("customerTypeId") == 1 || watch("customerTypeId") == 2 ? (
              <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledTextFieldElement
                  sx={estilosCamposGrises}
                  label={"Surname"}
                  name={"surname"}
                  fullWidth
                  rules={{
                    validate: (value) => {
                      if (!value) {
                        return `Surname is required`;
                      }
                      return true;
                    },
                  }}
                />
              </Grid2>
            ) : (
              <></>
            )}
            {watch("customerTypeId") == 3 ? (
              <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledTextFieldElement
                  sx={estilosCamposGrises}
                  label={"Company Contact"}
                  name={"companyContact"}
                  fullWidth
                />
              </Grid2>
            ) : (
              <></>
            )}
            <Grid2
              size={{ xs: 12, sm: 6 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledTextFieldElement
                sx={estilosCamposGrises}
                label={"Email"}
                name={"email"}
                fullWidth
                rules={{
                  validate: (value) => {
                    if (!value) {
                      return `Email is required`;
                    }
                    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return "Email is not valid";
                    }
                    return true;
                  },
                }}
              />
            </Grid2>
            {watch("customerTypeId") == 1 ? (
              <>
                <Grid2
                  size={{ xs: 12, sm: 3 }}
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                    borderBottom: "1px solid gold",
                  }}
                >
                  <Typography variant={"h6"} color={"gray"}>
                    Identification Number
                  </Typography>
                </Grid2>
                <Grid2
                  size={{ xs: 12, sm: 3 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StyledTextFieldElement
                    sx={estilosCamposGrises}
                    name={"identificationNumber"}
                    fullWidth
                    rules={{
                      validate: (value) => {
                        if (!value) {
                          return `Identification Number is required`;
                        }
                        return true;
                      },
                    }}
                  />
                </Grid2>
              </>
            ) : null}

            {watch("customerTypeId") == 2 ? (
              <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledTextFieldElement
                  label={"Company name"}
                  sx={estilosCamposGrises}
                  name={"companyName"}
                  fullWidth
                  rules={{
                    validate: (value) => {
                      if (!value) {
                        return `Identification Number is required`;
                      }
                      return true;
                    },
                  }}
                />
              </Grid2>
            ) : null}

            <Grid2
              size={{ xs: 12, sm: 2 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledTextFieldElement
                sx={estilosCamposGrises}
                label={"Age"}
                name={"age"}
                disabled
                fullWidth
                rules={{
                  validate: (value) => {
                    if (!value) {
                      return `Age is required`;
                    }
                    return true;
                  },
                }}
              />
            </Grid2>

            <Grid2
              size={{ xs: 12, sm: 2 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant={"h6"} color={"gray"}>
                Date of Birth
              </Typography>
            </Grid2>

            <Grid2
              size={{ xs: 12, sm: 2 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DatePicker
                onChange={(value) => {
                  const birthDate = dayjs(value);
                  const today = dayjs();
                  const years = today.diff(birthDate, "year");
                  setValue("age", years);
                }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 3 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledTextFieldElement
                sx={estilosCamposGrises}
                label={"Reference Passenger"}
                name={"referencePassenger"}
                fullWidth
                rules={{
                  validate: (value) => {
                    if (!value) {
                      return `Age is required`;
                    }
                    return true;
                  },
                }}
                onBlur={(event) => {
                  setValue(
                    event.target.name,
                    event.target.value.trim().toUpperCase(),
                  );
                }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 3 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledTextFieldElement
                disabled
                sx={estilosCamposGrises}
                label={"Travel Code"}
                name={"travelCode"}
                fullWidth
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <AutocompleteElement
                label={"Main Tour Reference"}
                name={"mainTourReference"}
                options={mainTourReferences}
                fullWidth
                autocompleteProps={{
                  getOptionLabel: (option) => option.reference,
                  getOptionKey: (option) => option.id,
                  onChange: (event, value) =>
                    handleChangeAutocomplete(value, "languageId"),
                  disableClearable: true,
                  sx: estilosAutocompleteGrises,
                }}
                rules={{
                  validate: (value) => {
                    if (!value) {
                      return `Main tour reference is required`;
                    }
                    return true;
                  },
                }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 3 }}
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                borderBottom: "1px solid gold",
              }}
            >
              <Typography variant={"h6"} color={"gray"}>
                Number of Passengers
              </Typography>
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 3 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledTextFieldElement
                sx={estilosCamposGrises}
                label={"Number of Passengers"}
                name={"numberPassengers"}
                fullWidth
                rules={{
                  validate: (value) => {
                    if (!value) {
                      return `Number of Passengers is required`;
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
                justifyContent: "right",
              }}
            >
              <Button
                sx={{
                  width: "30%",
                  backgroundColor: "#303030",
                  color: "white",
                  borderRadius: "2rem",
                  paddingY: "0.7rem",
                }}
                type="submit"
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  NEXT
                </Typography>
              </Button>
            </Grid2>
          </Grid2>
        </FormContainer>
      </Box>
    </Box>
  );
};
ContenidoCustomerData.propTypes = {
  setOpen: PropTypes.func,
  setSeverity: PropTypes.func,
  setSnackBarMessage: PropTypes.func,
  baseURL: PropTypes.string,
  setElementoInterno: PropTypes.func,
};

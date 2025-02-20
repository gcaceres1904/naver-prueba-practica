import { TextFieldElement } from "react-hook-form-mui";
import PropTypes from "prop-types";

export default function StyledTextFieldElement({ label, name, sx, ...props }) {
  return (
    <TextFieldElement
      label={label}
      name={name}
      variant="filled"
      slotProps={{
        inputLabel: {
          style: {
            textAlign: "center",
            transformOrigin: "center",
            fontSize: "1.2rem",
            color: "#707070",
          },
        },
      }}
      sx={{
        backgroundColor: "white",
        borderRadius: "2rem",
        "& .MuiFilledInput-root": {
          borderRadius: "2rem",
          backgroundColor: "white",
          "&:before": {
            borderBottomColor: "transparent",
          },
          "&:after": {
            borderBottomColor: "transparent",
          },
        },
        input: {
          color: "black",
          textAlign: "center",
        },
        "& .MuiFormLabel-root": {
          color: "#474747",
          "&.Mui-focused, &.MuiFormLabel-filled": {
            textAlign: "left",
          },
          "&:not(.Mui-focused):not(.MuiFormLabel-filled)": {
            textAlign: "center",
            width: "100%",
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
}

StyledTextFieldElement.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
  props: PropTypes.object,
};

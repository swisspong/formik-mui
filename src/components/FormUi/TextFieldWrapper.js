import React from "react";
import {
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";
const TextFieldWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const textFieldProps = {
    ...field,
    ...otherProps,
  };

  if (meta.touched && meta.error) {
    textFieldProps.error = true;
    textFieldProps.helperText = meta.error;
  }
  return (
    <Box mx={1} my={2}>
      <TextField {...textFieldProps} name={name} />
    </Box>
  );
};

export default TextFieldWrapper;

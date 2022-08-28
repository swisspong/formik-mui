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
import { useField, useFormikContext, getIn } from "formik";
const TextFieldWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  //const { values } = useFormikContext();
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
      <TextField
        {...textFieldProps}
       // value={getIn(values, name)}
        id={name}
        name={name}
      />
    </Box>
  );
};

export default TextFieldWrapper;

import React, { useState } from "react";
import {
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
const SelectWrapper = ({ name, label, options, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setValues } = useFormikContext();
  const onChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const selectProps = {
    ...field,
    ...otherProps,

    id: name,
    onChange: onChange,
  };
  return (
    <Box m={1}>
      <FormControl
        sx={{ minWidth: 120 }}
        fullWidth
        error={meta.error && meta.touched}
      >
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select {...selectProps} labelId={`${name}-label`} label={label}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {meta.touched && meta.error && meta.error}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default SelectWrapper;

import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { getIn, useField, useFormikContext } from "formik";
const SwitchWrapper = ({ name, label, changeHandler, ...otherProps }) => {
  const [field] = useField(name);
  const { setFieldValue, setValues, values } = useFormikContext();

  const handleChange = (event) => {
    const { checked } = event.target;
    if (changeHandler) {
      // setValues(() => ({ ...values, option: checked }));
      changeHandler(setValues, values);
    } else {
      setFieldValue(name, checked);
    }
  };
  const selectProps = {
    ...field,
    ...otherProps,
    checked: getIn(values, name),
    id: name,
    onChange: handleChange,
  };
  return (
    <FormControlLabel control={<Switch {...selectProps} />} label={label} />
  );
};

export default SwitchWrapper;

import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { getIn, useField, useFormikContext } from "formik";
const SwitchWrapper = ({
  index = null,
  name,
  label,
  changeHandler,
  ...otherProps
}) => {
  const [field] = useField(name);
  const { setFieldValue, setValues, values } = useFormikContext();

  const handleChange = (event) => {
    const { checked } = event.target;
    if (changeHandler) {
      // setValues(() => ({ ...values, option: checked }));
      changeHandler(setValues, values,index);
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
    <FormControlLabel
      sx={{ mx: 1 }}
      control={<Switch {...selectProps} />}
      label={label}
    />
  );
};

export default SwitchWrapper;

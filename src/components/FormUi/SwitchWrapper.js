import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
const SwitchWrapper = ({ name, ...otherProps }) => {
  return <FormControlLabel control={<Switch />} label="Have Option" />;
};

export default SwitchWrapper;

import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Checkbox, FormHelperText, ListItemText } from "@mui/material";
import { getIn, useField, useFormikContext } from "formik";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectChip({
  name,
  options,
  labelId,
  //changeHandler,
  ...otherProps
}) {
  const [field, meta] = useField(name);
  const { setFieldValue, values } = useFormikContext();
  // const [personName, setPersonName] = React.useState([]);
  // console.log(getIn(values, name));
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    setFieldValue(name, typeof value === "string" ? value.split(",") : value);
    //changeHandler(name, setFieldValue, values, value);
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   typeof value === "string" ? value.split(",") : value
    // );
  };

  const selectProps = {
    ...field,
    ...otherProps,

    id: name,
    onChange: handleChange,
  };

  return (
    <Box mx={1} my={2}>
      <FormControl
        sx={{ minWidth: 120 }}
        fullWidth
        error={meta.error && meta.touched}
      >
        <InputLabel id={labelId}>Chip</InputLabel>
        <Select
          {...selectProps}
          labelId={labelId}
          multiple
          value={getIn(values, name)}
          // onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => {
            console.log(selected);
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    color="primary"
                    variant="outlined"
                    key={value}
                    label={options.find((item) => item.value === value).key}
                  />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox
                checked={
                  getIn(values, name)?.findIndex(
                    (item) => item === option.value
                  ) > -1
                }
              />
              <ListItemText primary={option.key} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {meta.touched && meta.error && meta.error}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}

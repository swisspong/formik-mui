import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { getIn, useField, useFormikContext } from "formik";
import React from "react";

const TagsInput = ({ name, placeholder }) => {
  //   const [field, meta] = useField(name);
  const { setFieldValue, values } = useFormikContext();
  //   const onChange = (e) => {
  //     setFieldValue(name, [...getIn(values, name), e.target.value]);
  //   };

  return (
    // <Autocomplete
    //   multiple
    //   id="tags-filled"
    //   options={[]}
    //   defaultValue={getIn(values, name)}
    //   freeSolo
    //   renderTags={(value, getTagProps) => {
    //     console.log(getTagProps);
    //     return value.map((option, index) => (
    //       <Chip variant="outlined" label={option} onDelete={}  />
    //     ));
    //   }}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       variant="filled"
    //       label="freeSolo"
    //       placeholder="Favorites"
    //     />
    //   )}
    // />
    //     <Autocomplete
    //     onChange={(event, value) => console.log(value)} // prints the selected value
    //     renderInput={params => (
    //         <TextField {...params} label="Label" variant="outlined" fullWidth />
    //     )}
    // />
    <Box mx={1} my={2}>
      <Autocomplete
        style={{ margin: "10px 0" }}
        multiple
        id="tags-outlined"
        options={[]}
        defaultValue={[]}
        freeSolo
        name={name}
        //   autoSelect
        onChange={(event, value) => setFieldValue(name, value)}
        renderInput={(params) => (
          <TextField
            //   {...field}
            {...params}
            label="Tags"
            placeholder="Tags"
            name={name}
            //   value={getIn(values, name)}
          />
        )}
      />
    </Box>
    // <Autocomplete
    //   multiple
    //   id="tags-standard"
    //   options={[]}
    //   freeSolo
    //   // getOptionLabel={(option) => option.title}
    //   defaultValue={getIn(values, name)}
    //   renderTags={(value, getTagProps) => {
    //     // console.log(value);
    //     return value.map((option, index) => (
    //       <Chip
    //         variant="outlined"
    //         label={option}
    //         onDelete={() => {
    //           console.log(getIn(values, name));
    //           const deleted = getIn(values, name).splice(index, 1);
    //           console.log(deleted);
    //           setFieldValue(name, deleted);
    //         }}
    //       />
    //     ));
    //   }}
    //   autoSelect
    //   onChange={onChange}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       // variant="standard"
    //       label="Multiple values"
    //       placeholder={placeholder}
    //       value={getIn(values, name)}
    //     />
    //   )}
    // />
  );
};

export default TagsInput;

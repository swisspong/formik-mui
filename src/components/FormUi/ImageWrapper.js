import { Box, Button, FormControl, FormHelperText } from "@mui/material";
import { useField, useFormikContext, getIn } from "formik";
import React from "react";
import PreviewImage from "./PreviewImage";

const ImageWrapper = ({ name, label, multiple, ...otherProps }) => {
  const [field, meta] = useField(name);

  const { setFieldValue, values } = useFormikContext();
  const changeHandler = (e) => {
    if (multiple) {
      const files = Array.from(e.target.files).map((file) => file);
      setFieldValue(name, files);
    } else {
      setFieldValue(name, e.target.files[0]);
    }
  };
  
  return (
    <Box
      display={"flex"}
      sx={{
        m: 1,
      }}
    >
      <FormControl
        sx={{ minWidth: 120, width: "100%" }}
        error={meta.touched && meta.error}
        fullWidth
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          sx={{
            p: 2,
            w: 1,
            border: "2px dashed grey",
            // borderColor: "error.main",
            borderColor: "grey.500",
          }}
        >
          <Box
            display={"flex"}
            flexDirection="column"
            flexGrow={1}
            alignContent={"flex-start"}
          >
            {getIn(values, name) && (
              <Box flexGrow={1} display={"flex"} gap={1} flexWrap="wrap">
                {multiple ? (
                  getIn(values, name).map((file) => (
                    <PreviewImage file={file} />
                  ))
                ) : (
                  <PreviewImage file={getIn(values, name)} />
                )}
              </Box>
            )}
            <Box
              mt={getIn(values, name) && 2}
              flexGrow={1}
              display={"flex"}
              justifyContent={"center"}
            >
              <Button variant="contained" component="label">
                {label}
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  multiple={multiple}
                  // onChange={(e) => setFieldValue(name, e.target.files[0])}
                  onChange={changeHandler}
                />
              </Button>
            </Box>
          </Box>
        </Box>
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default ImageWrapper;

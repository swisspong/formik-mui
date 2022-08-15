import { Box, Button, FormControl, FormHelperText } from "@mui/material";

import React from "react";

const ImageWrapper = ({ name, ...otherProps }) => {
  return (
    <>
      <FormControl sx={{ minWidth: 120 }} fullWidth>
        <Box
          display={"flex"}
          justifyContent={"center"}
          m={1}
          sx={{ p: 2, border: "2px dashed grey", borderColor: "error.main" }}
        >
          <Button>Image</Button>
        </Box>
        <FormHelperText>test</FormHelperText>
      </FormControl>
    </>
  );
};

export default ImageWrapper;

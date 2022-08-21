import React from "react";
import { Button, Fab, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

const HeadingCrud = ({ label, labelBtn, backTo, to }) => {
  const styleFlex = {
    ...(!backTo && { justifyContent: "space-between" }),
  };
  return (
    <Stack direction={"row"} my={3} {...styleFlex} spacing={2}>
      {backTo && (
        <Fab
          component={Link}
          to={backTo}
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
        >
          <ArrowBackIosIcon fontSize="small" sx={{ mr: 1 }} />
          Back
        </Fab>
      )}

      <Typography variant="h5">{label}</Typography>
      {!backTo && labelBtn && (
        <Button to={to} component={Link} variant="contained">
          {labelBtn}
        </Button>
      )}
    </Stack>
  );
};

export default HeadingCrud;

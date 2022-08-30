import React from "react";
import { Box, Button, Fab, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import {
  swalCreateFail,
  swalDeleteButton,
  swalDeleteSuccess,
} from "../utils/sweetAlertUtil";

const HeadingCrud = ({
  label,
  labelBtn,
  backTo,
  to,
  editPath,
  deleteHandler,
}) => {
  const styleFlex = {
    // ...(!backTo && { justifyContent: "space-between" }),
    justifyContent: "space-between",
  };
  const navigate = useNavigate();

  const deleteHandleClick = () => {
    swalDeleteButton()
      .then((result) => {
        if (result.isConfirmed) {
          return true;
        } else {
          return false;
        }
      })
      .then((isConfirmed) => {
        if (isConfirmed) {
          return deleteHandler().unwrap();
        }
      })
      .then(() => {
        swalDeleteSuccess();
        navigate(-1);
      })
      .catch((error) => {
        swalCreateFail(error.data.message);
      });
  };
  return (
    <Stack
      direction={"row"}
      my={3}
      {...styleFlex}
      spacing={2}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
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
      </Stack>
      {!backTo && labelBtn && (
        <Button to={to} component={Link} variant="contained">
          {labelBtn}
        </Button>
      )}
      {deleteHandler && (
        <Stack direction={"row"} spacing={2}>
          <Button
            to={editPath}
            component={Link}
            variant="contained"
            startIcon={<EditIcon />}
          >
            edit
          </Button>
          <Button
            variant="contained"
            color={"error"}
            startIcon={<DeleteIcon />}
            onClick={deleteHandleClick}
          >
            delete
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default HeadingCrud;

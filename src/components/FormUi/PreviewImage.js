import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const PreviewImage = ({ file, isLoading = false, url, deleteHandler }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <>
      <Paper
        sx={{
          width: "204px",
          height: "180px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {isLoading && (
          <Backdrop open={true} sx={{ color: "#fff", position: "absolute" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <IconButton
          aria-label="delete"
          size="medium"
          color="error"
          sx={{ position: "absolute", right: 5, top: 5 }}
          onClick={deleteHandler}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={url ? url : preview}
        />
      </Paper>
      {/* <Box
        sx={{
          borderStyle: "solid",
          borderWidth: "0.1px",
          position: "relative",
          width: "204px",
          height: "180px",
          padding: "0.75rem",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={preview}
        />
      </Box> */}
    </>
  );
};

export default PreviewImage;

import { Box } from "@mui/material";
import React, { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };
  return (
    <Box
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
    </Box>
  );
};

export default PreviewImage;

import { Typography } from "@mui/material";
import React from "react";

const Section = ({ label, info,mb=20 }) => {
  return (
    <section style={{ display: "block", marginBottom: mb }}>
      <Typography
        component={"label"}
        variant="caption"
        display={"block"}
        color={"grey.600"}
      >
        {label}
      </Typography>
      {info}
    </section>
  );
};

export default Section;
